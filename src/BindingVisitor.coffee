###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

{GenericVisitor} = require './GenericVisitor'
ClassBinding     = require './binding/ClassBinding'
estypes          = require 'ast-types'


class BindingVisitor extends GenericVisitor

  builders = estypes.builders

  make_method = (id, params, body, is_static=no, kind='method') ->
    fn = builders.functionDeclaration id, params, body
    builders.methodDefinition kind, id, fn, is_static

  make_static_get = (args...) ->
    make_method args..., yes, 'get'

  make_static_set = (args...) ->
    make_method args..., yes, 'set'

  flatten = (array_of_array) ->
    [].concat.apply [], array_of_array

  visitTypeDeclaration: (node, binding, args...) ->
    binding = new ClassBinding node
    su = super node, binding, args...
    (lazy) =>
      su (id, decls, su) =>
        decls = flatten decls
        ctor_inits = for init in binding.ctor_raw_field_inits
          init = @visit init, binding, args...
          init.id = builders.memberExpression builders.thisExpression(), init.id, no
          expr = builders.assignmentExpression '=', init.id, init.init
          builders.expressionStatement expr
        delete binding.ctor_raw_field_inits
        lazy id, decls, su, ctor_inits, binding

  visitFieldDeclaration: (node, binding, args...) ->
    if @constructor.has_modifier node, 'static' 
      type = @visit node.type, binding, args...
      is_prim = type.name in ['long', 'byte', 'int', 'short', 
                  'double', 'float', 'boolean', 'String', 'char']
      frags = for fragment in node.fragments
        decl = @visit fragment, binding, args...
        decl.init ?= @visit @constructor.make_def_field_init(node), binding, args...
        if is_prim and not fragment.extraDimensions and
            @constructor.has_modifier node, 'final'
          body = builders.blockStatement [builders.returnStatement decl.init]
          make_static_get decl.id, [], body
        else
          operand = builders.memberExpression binding.class_id, decl.id, no
          del = builders.unaryExpression 'delete', operand, no
          del = builders.expressionStatement del
          expr = builders.assignmentExpression '=', operand, decl.init
          body = builders.blockStatement [del, builders.returnStatement expr]
          getter = make_static_get decl.id, [], body
          if not @constructor.has_modifier node, 'final'
            param = builders.identifier 'value'
            expr = builders.assignmentExpression '=', operand, param
            expr = builders.expressionStatement expr
            body_set = builders.blockStatement [del, expr]
            [getter, make_static_set decl.id, [param], body_set]
          else
            getter
            
      flatten frags
    else
      @constructor.IGNORE_ME

  visitSimpleName: (node, binding, args...) ->
    su = super node, binding, args...
    binding.bind id:su, foreign:node if binding
    su


module.exports = BindingVisitor