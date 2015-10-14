###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

class Dict 
  constructor: (locals) ->
    _locals = {}

    @get_value = (name, def=null) =>
      if @.contains name then _locals[name] else def

    @contains = (name) ->
      {}.hasOwnProperty.call _locals, name

    @clone = =>
      new @.constructor _locals

    @set_value = (name, type) ->
      _locals[name] = type

    @each = (fn) ->
      fn key, value for own key, value of _locals

    for own key, value of locals
      @.set_value key, value


module.exports = Dict