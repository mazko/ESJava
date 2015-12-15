###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

SuperVisitor = require './ResolveSelfVisitor'
estypes      = require 'ast-types'


class OverloadVisitor extends SuperVisitor

  builders = estypes.builders

  make_method = (id, params, body, is_static=no, kind='method') ->
    fn = builders.functionDeclaration id, params, body
    builders.methodDefinition kind, id, fn, is_static

  visitTypeDeclaration: (node, binding, args...) ->
    su = super node, binding, args...
    (lazy) ->
      su (id, decls, args..., binding) ->
        for overload in binding.ls_potential_overloads()
          lit = builders.literal overload.name + overload.pattern
          rest = builders.identifier 'args'
          prop = builders.memberExpression rest, builders.identifier 'length'
          prop = builders.binaryExpression '+', lit, prop
          expr = if overload.static
            binding.class_id
          else
            builders.thisExpression()
          mem = builders.memberExpression expr, prop, yes
          call = builders.callExpression mem, [builders.spreadElement rest]
          body = builders.blockStatement [builders.returnStatement call]
          meth = builders.identifier overload.name
          decls.push make_method meth, [builders.restElement rest], body, overload.static
        lazy id, decls, args..., binding

  visitMethodDeclaration: (node, binding, args...) ->
    su = super node, binding, args...
    (lazy) ->
      su (id, params, body, locals) ->
        id.name = binding.overload id.name, params if not node.constructor
        lazy id, params, body, locals

  visitMethodInvocation: (node, binding, args...) ->
    su = super node, binding, args...
    (lazy) ->
      su (id, params, expr) ->
        do_overload = expr?.type is 'ThisExpression'
        do_overload or= expr?.type is 'Identifier' and expr?.name is binding.class_id.name
        id.name = binding.overload id.name, params if do_overload
        lazy id, params, expr


module.exports = OverloadVisitor