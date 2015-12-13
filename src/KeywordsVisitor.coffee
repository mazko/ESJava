###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###


SuperVisitor   = require './BindingVisitor'
Scope          = require './binding/BindingScope'


class KeywordsVisitor extends SuperVisitor

  #TODO: also for class members (or methods only)
  RESERVED = ['in', 'var', 'function', 'constructor', 'delete', 'eval', 'arguments', 'let', 'with', 'yield']

  rename_id = (id)-> id.name += '$esjava' if id.name in RESERVED

  visitSimpleName: (node, binding, args...) ->
    su = super node, binding, args...
    resolve = -> binding.resolve_id(su)?.scope
    if binding and Scope.LOCAL is resolve()
      rename_id su
    su

  visitVariableDeclarationFragment: (node, binding, args...) ->
    su = super node, binding, args...
    (lazy) ->
      su (id, init) ->
        rename_id id
        lazy id, init

  visitSingleVariableDeclaration: (node, binding, args...) ->
    su = super node, binding, args...
    rename_id su
    su


module.exports = KeywordsVisitor