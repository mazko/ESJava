###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

estypes      = require 'ast-types'
Dict         = require '../collections/Dict'
{GenericVisitor, MicroVisitor} = require '../GenericVisitor'


builders = estypes.builders


class VarScope

  class VarModel
    constructor: (@type, @static=no, @private=no, @super=no) ->

  constructor: (src=null, {_vars}={_vars:new Dict}) ->
    @contains = _vars.contains
    @get_type = (name, def=null) -> _vars.get_value(name)?.type or def
    @is_static = (name) -> !!_vars.get_value(name)?.static
    @is_private = (name) -> !!_vars.get_value(name)?.private
    @clone = -> new @constructor null, _vars:_vars.clone()
    @clone_super = ->
      vars = new Dict
      su_fields = []
      _vars.each (k, v) ->
        if not v.private
          model = new VarModel v.type, v.static, no, yes
          vars.set_value k, model
        model = new VarModel v.type, v.static, v.private, yes
        model.name = k
        su_fields.push model
      [su_fields, new @constructor null, _vars:vars]
    _unique_var_validator = []
    @collect_from = (src) ->
      safe_vars_set = (nm, args...) ->
        if nm in _unique_var_validator
          throw "ASSERT: Duplicate Variable < #{nm} >"
        _unique_var_validator.push nm
        _vars.set_value nm, args...
      class VarCollector extends MicroVisitor
        visitSingleVariableDeclaration: (node, args...) ->
          decl = @visit node.name, args...
          type = @visit node.type, args...
          model = new VarModel type
          safe_vars_set decl.name, model
        visitVariableDeclarationStatement: (node, args...) ->
          decls = @visit node.fragments, args...
          type = @visit node.type, args...
          has_static = @constructor.has_modifier node, 'static'
          model = new VarModel type, has_static
          safe_vars_set decl.id.name, model for decl in decls
          model
        visitFieldDeclaration: (node, args...) ->
          model = @visitVariableDeclarationStatement node, args...
          model.private = @constructor.has_modifier node, 'private'
        visitCatchClause: (node, args...) ->
          @visit node.exception, args... 
        visitVariableDeclarationFragment: (node, args...) ->
          id = @visit node.name, args...
          builders.variableDeclarator id, null
        visitForStatement: (node, args...) ->
          @visit node.initializers, args...
        visitVariableDeclarationExpression: (node, args...) ->
          @visitVariableDeclarationStatement node, args...
        visitAssignment: (node, args...) ->
          @constructor.IGNORE_ME
        visitTypeDeclaration: (node, args...) ->
          throw 'NotImpl: Nested | Inner classes ?'
      new VarCollector().visit src
    @collect_from src if src


class MemberScope

  validate = (fields, methods, su_fields, su_methods) ->
    # fields ws fields
    for f in su_fields when not f.static and fields.contains(f.name) and not fields.is_static f.name
      # class A {
      #  private int conflict;
      # }
      # class B extends A {
      #  private? int conflict;
      # }
      if f.private
        throw "NotImpl: field < #{f.name} > conflicts with super private one"
      # class A {
      #  int conflict;
      # }
      # class B extends A {
      #  private int conflict;
      # }
      if fields.is_private f.name
        throw "NotImpl: private field < #{f.name} > conflicts with super one"

    # methods ws methods
    for m in su_methods when not m.static and methods.contains(m.name, new Array(m.overload)) and not methods.is_static m.name, new Array(m.overload)
      # class A {
      #  private int conflict(){};
      # }
      # class B extends A {
      #  private? int conflict(){};
      # }
      if m.private
        throw "NotImpl: method < #{m.name} > conflicts with super private one"
      # class A {
      #  int conflict(){};
      # }
      # class B extends A {
      #  private int conflict(){};
      # }
      if methods.is_private m.name, new Array(m.overload)
        throw "NotImpl: private method < #{m.name} > conflicts with super one"

    # fields ws methods
    for o in methods.ls_potential_overloads()
      # class A {
      #  int conflict;
      # }
      # class B extends A {
      #  int conflict(){};
      # }
      for f in su_fields when not o.static and not f.static and f.name is o.name
        throw "NotImpl: method < #{o.name} > conflicts with same super field"
      # class A {
      #  int conflict;
      #  int conflict(){};
      # }
      if fields.contains(o.name) and (o.static is fields.is_static o.name)
        throw "NotImpl: field < #{o.name} > conflicts with same method"

  class MethodModel
    constructor: (@type, @overload, @static=no, @private=no, @super=no, @ctor=no) ->

  constructor: (cls_node, {_fields,_methods,_su_fields,_su_methods}={_fields:new VarScope, _methods:new Dict, _su_fields:[], _su_methods:[]}) ->

    @clone_super = (cls_node) ->
      methods = new Dict
      su_methods = [_su_methods...]
      _methods.each (k, v) ->
        model = for m in v when not m.private
          new MethodModel m.type, m.overload, m.static, no, yes, m.ctor
        methods.set_value k, model if model.length
        for m in v
          model = new MethodModel m.type, m.overload, m.static, m.private, yes, m.ctor
          model.name = k
          su_methods.push model
      [su_fields, fields] = _fields.clone_super()
      su_fields = [_su_fields..., su_fields...]
      new @constructor cls_node, 
        _fields:fields, _methods:methods, 
        _su_fields:su_fields, _su_methods:su_methods

    class MembersCollector extends MicroVisitor
      visitFieldDeclaration: (node, args...) ->
        _fields.collect_from node
      visitMethodDeclaration: (node, args...) ->
        id = @visit node.name, args...
        retype = @visit node.returnType2, args...
        models = _methods.get_value id.name, []
        overload = node.parameters.length
        for model in models when overload is model.overload and not model.super
          throw 'NotImpl: Overload by argumens type ' + id.name
        # filter super
        models = (model for model in models when overload isnt model.overload)
        has_static = @constructor.has_modifier node, 'static'
        has_private = @constructor.has_modifier node, 'private'
        models.push new MethodModel retype, overload, has_static, has_private, no, node.constructor
        _methods.set_value id.name, models
      visitTypeDeclaration: (node, args...) ->
        throw 'NotImpl: Nested | Inner classes ?' if node isnt cls_node 
        @visit node.bodyDeclarations, args...
        @visit node.name, args...

    @scope_id = new MembersCollector().visit cls_node

    @fields = ['get_type', 'contains', 'is_static', 'is_private'].reduce (left, right) ->
        GenericVisitor.set_prop obj:left, prop:right, value:_fields[right]
      , {}

    @methods = 
      contains: (args...) => 
        null isnt @methods.get_type args...

      get_type: (name, params) ->
        for model in _methods.get_value name, []
          return model.type if params.length is model.overload
        null

      is_static: (name, params) ->
        for model in _methods.get_value name, []
          return !!model.static if params.length is model.overload
        no

      is_private: (name, params) ->
        for model in _methods.get_value name, []
          return !!model.private if params.length is model.overload
        no

      ls_potential_overloads: ->
        ls = []
        _methods.each (k,v) ->
          o = (c for c in v when not c.super and not c.private and not c.ctor)
          statics = (c.overload for c in o when c.static)
          ls.push name:k, static:yes, pars:statics if statics.length
          instances = (c.overload for c in o when not c.static)
          ls.push name:k, static:no, pars:instances if instances.length
        ls

      overload: (name, params) ->
        methods = _methods.get_value name
        if methods?.length
          name + '$esjava$' + params.length
        else 
          name

    # validation after data collected
    validate @fields, @methods, _su_fields, _su_methods

class ScopeVisitor extends GenericVisitor

  visitTypeDeclaration: (node, members, args...) ->
    members or= new MemberScope node
    su = super node, members, args...
    (lazy) ->
      su (id, decls, su) ->
        lazy id, decls, su, members

  visitVariableDeclarationStatement: (node, members, locals, args...) ->
    locals.collect_from node
    super node, members, locals, args...

  visitCatchClause: (node, members, locals, args...) ->
    locals = locals.clone()
    locals.collect_from node
    super node, members, locals, args...

  visitForStatement: (node, members, locals, args...) ->
    locals = locals.clone()
    locals.collect_from node
    super node, members, locals, args...

  visitMethodDeclaration: (node, members, locals, args...) ->
    locals = new VarScope node.parameters
    su = super node, members, locals, args...
    (lazy) ->
      su (id, params, body) ->
        lazy id, params, body, locals

  visitBlock: (node, members, locals, args...) ->
    super node, members, locals.clone(), args...


module.exports = ScopeVisitor