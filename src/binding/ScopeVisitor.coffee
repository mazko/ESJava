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
    constructor: (@type, @static) ->

  constructor: (src=null, {_vars}={_vars:new Dict}) ->
    @contains = _vars.contains
    @get_type = (name, def=null) -> _vars.get_value(name)?.type or def
    @is_static = (name) -> !!_vars.get_value(name)?.static
    @clone = -> new @constructor null, _vars:_vars.clone()
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
          model = new VarModel type, no
          safe_vars_set decl.name, model
        visitVariableDeclarationStatement: (node, args...) ->
          decls = @visit node.fragments, args...
          type = @visit node.type, args...
          has_static = @constructor.has_modifier node, 'static'
          model = new VarModel type, has_static
          safe_vars_set decl.id.name, model for decl in decls
        visitFieldDeclaration: (node, args...) ->
          @visitVariableDeclarationStatement node, args...
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


class FieldScope extends VarScope
    # https://coffeescript-cookbook.github.io/chapters/classes_and_objects/cloning
    clone = (obj) ->
      if not obj? or typeof obj isnt 'object'
        return obj

      if obj instanceof Date
        return new Date(obj.getTime()) 

      if obj instanceof RegExp
        flags = ''
        flags += 'g' if obj.global?
        flags += 'i' if obj.ignoreCase?
        flags += 'm' if obj.multiline?
        flags += 'y' if obj.sticky?
        return new RegExp(obj.source, flags) 

      newInstance = new obj.constructor()

      for key of obj
        newInstance[key] = clone obj[key]

      return newInstance

    has_static = (node) -> MicroVisitor.has_modifier node, 'static'
    make_def_init = MicroVisitor.make_def_field_init

    constructor: (args...) ->
      super args...
      _raw_inits = []
      @get_raw_inits = -> [_raw_inits...]
      _collect_from = @collect_from
      @collect_from = (node) ->
        if node.node isnt 'FieldDeclaration'
          throw "ASSERT: FieldDeclaration expected instead #{node.node}"
        if not has_static node
          for fragment in node.fragments
            if not fragment.initializer
              fragment = clone fragment
              fragment.initializer = make_def_init node
            _raw_inits.push fragment
        _collect_from node


class MemberScope

  class MethodModel
    constructor: (@type, @overload, @static) ->

  constructor: (ndcls) ->
    _fields  = new FieldScope
    _methods = new Dict

    class MembersCollector extends MicroVisitor
      visitFieldDeclaration: (node, args...) ->
        _fields.collect_from node
      visitMethodDeclaration: (node, args...) ->
        id = @visit node.name, args...
        retype = @visit node.returnType2, args...
        models = _methods.get_value id.name, []
        overload = node.parameters.length
        for model in models when overload is model.overload
          throw 'NotImpl: Overload by argumens type ' + id.name
        has_static = @constructor.has_modifier node, 'static'
        models.push new MethodModel retype, overload, has_static
        _methods.set_value id.name, models
      visitTypeDeclaration: (node, args...) ->
        throw 'NotImpl: Nested | Inner classes ?' if node isnt ndcls 
        @visit node.bodyDeclarations, args...
        @visit node.name, args...

    @scope_id = new MembersCollector().visit ndcls

    @fields = ['get_type', 'get_raw_inits', 'contains', 'is_static'].reduce (left, right) ->
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

      overload: (name, params) ->
        if _methods.get_value(name)?.length > 1
          name + '$' + params.length
        else
          if _fields.contains name
            name + '$fixed'
          else
            name


class ScopeVisitor extends GenericVisitor

  visitTypeDeclaration: (node, args...) ->
    members = new MemberScope node
    su = super node, members, args...
    (lazy) ->
      su (id, decls, su, inits) ->
        lazy id, decls, su, inits, members

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