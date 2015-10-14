###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

SuperVisitor = require './ResolveSelfVisitor'


class OverloadVisitor extends SuperVisitor

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