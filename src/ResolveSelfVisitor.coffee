###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

estypes      = require 'ast-types'
SuperVisitor = require './KeywordsVisitor'
Scope        = require './binding/BindingScope'


class ResolveThisVisitor extends SuperVisitor

  builders = estypes.builders

  # TODO: crazy code begins
  # Override correctly all possible self visits istead baggy
  # visit[SimpleName, QualifiedName, FieldAccess] hack

  visitSimpleName: (node, binding, args...) ->
    su = super node, binding, args...
    resolved = binding?.resolve_id su
    if Scope.FIELD is resolved?.scope
      if resolved.is_static
        expr = binding.class_id
      else
        expr = builders.thisExpression()
      builders.memberExpression expr, su, no
    else
      su

  visitQualifiedName: (node, binding, args...) ->
    su = super node, binding, args...
    (lazy) ->
      su (object, property) ->
        if property.object and property.object is binding?.class_id
          property = property.property
        lazy object, property

  visitFieldAccess: (node, binding, args...) ->
    su = super node, binding, args...
    (lazy) ->
      su (id, expr) ->
        if id.object?.type is 'ThisExpression'
          ugly_id = id.property
          ugly_expr = id.object
          resolved = binding.resolve_id ugly_id
          if Scope.FIELD is resolved?.scope
            return lazy ugly_id, ugly_expr
        else if expr.type is 'ThisExpression' and binding.class_id is id.object
            return lazy id.property, expr
        lazy id, expr

  # crazy ended

  visitMethodInvocation: (node, binding, args...) ->
    su = super node, binding, args...
    (lazy) ->
      su (id, params, expr) ->
        resolved = binding.resolve_id id
        if not expr and Scope.METHOD is resolved?.scope
          if resolved.is_static
            expr = binding.class_id
          else
            expr = builders.thisExpression()
        lazy id, params, expr


module.exports = ResolveThisVisitor