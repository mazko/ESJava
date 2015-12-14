###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

{GenericVisitor} = require './GenericVisitor'
CUBinding        = require './binding/CUNaiveBinding'
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

  make_this_get = (args...) ->
    make_method args..., no, 'get'

  make_this_set = (args...) ->
    make_method args..., no, 'set'

  flatten = (array_of_array) ->
    [].concat.apply [], array_of_array

  visitCompilationUnit: (node, args...) ->
    binding = new CUBinding node
    super node, binding, args...

  visitTypeDeclaration: (node, binding, args...) ->
    binding.checkout_type node
    su = super node, binding, args...
    (lazy) ->
      su (id, decls, su) ->
        decls = flatten decls
        lazy id, decls, su, binding

  visitFieldDeclaration: (node, binding, args...) ->
    type = @visit node.type, binding, args...
    frags = for fragment in node.fragments
      decl = @visit fragment, binding, args...
      decl.init ?= @visit @constructor.make_def_field_init(node), binding, args...
      if @constructor.has_modifier node, 'static'
        is_prim = type.name in ['long', 'byte', 'int', 'short', 
                'double', 'float', 'boolean', 'String', 'char']
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
      else
        esid = builders.identifier "_$esjava$#{decl.id.name}" 
        operand = builders.memberExpression builders.thisExpression(), esid, no
        expr = builders.identifier 'Object.prototype.hasOwnProperty.call'
        expr = builders.callExpression expr, [builders.thisExpression(), builders.literal esid.name]
        expr = builders.conditionalExpression expr, operand, decl.init 
        body = builders.blockStatement [builders.returnStatement expr]
        getter = make_this_get decl.id, [], body
        param = builders.identifier 'value'
        expr = builders.assignmentExpression '=', operand, param
        expr = builders.expressionStatement expr
        body_set = builders.blockStatement [expr]
        [getter, make_this_set decl.id, [param], body_set]

    flatten frags

  visitSimpleName: (node, binding, args...) ->
    su = super node, binding, args...
    binding.bind id:su, foreign:node if binding
    su


module.exports = BindingVisitor