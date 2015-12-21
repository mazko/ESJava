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
      su (__id, __decls, __args..., __binding) ->
        for o in __binding.ls_potential_overloads()
          expr = if o.static
            __binding.class_id
          else
            builders.thisExpression()
          rest = builders.identifier 'args'
          cases = for par_cnt in o.pars
            nm = builders.identifier __binding.overload o.name, new Array par_cnt
            call = builders.memberExpression expr, nm, no
            call = builders.callExpression call, [builders.spreadElement rest]
            test = builders.literal par_cnt
            builders.switchCase test, [builders.returnStatement call]
          discriminant = builders.memberExpression rest, builders.identifier 'length'
          sw = builders.switchStatement discriminant, cases
          # http://www.2ality.com/2015/02/es6-classes-final.html
          # super-call static methods works both wit instance & class
          meth = builders.identifier o.name
          def_call = builders.memberExpression builders.super(), meth
          def_call = builders.callExpression def_call, [builders.spreadElement rest]
          body = builders.blockStatement [sw, builders.returnStatement def_call]
          __decls.push make_method meth, [builders.restElement rest], body, o.static
        lazy __id, __decls, __args..., __binding

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

  visitSuperMethodInvocation: (node, binding, args...) ->
    su = super node, binding, args...
    (lazy) ->
      su (id, params, expr) ->
        id.name = binding.overload id.name, params
        lazy id, params, expr


module.exports = OverloadVisitor