###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

class ASTVisitor
  @isArray: Array?.isArray or (value) -> 
    {}.toString.call(value) is '[object Array]'

  @dump: (obj) ->
    JSON.stringify obj, null, 2

  @IGNORE_ME: {}

  @not_lazy: (candidate) -> candidate?((args...) -> args) or candidate

  @set_prop: ({obj, prop, value}) ->
    obj[prop] = value
    obj

  @intersection: (a, b) ->
    [a, b] = [b, a] if a.length > b.length
    value for value in a when value in b

  visit: (node, args...) ->
    if node
      nl = @constructor.not_lazy
      if @constructor.isArray node
        nodes = (@visit value, args... for value in node)
        nl node for node in nodes when node isnt @constructor.IGNORE_ME
      else if node.node
        fn = "visit#{node.node}"
        callee = @[fn]
        if callee
          nl callee.call @, node, args...
        else
          throw "Not Impl < #{fn} > #{@constructor.dump node}"
      else 
        throw "Afraid to visit #{@constructor.dump node}"
    else null


module.exports = ASTVisitor