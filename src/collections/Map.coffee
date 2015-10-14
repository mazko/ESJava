###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

class Map 
  constructor: () ->
    _keys = []
    _values = []

    @put = (key, value) ->
      index = _keys.indexOf key
      if index is -1
        _keys.push key
        _values.push value
      else
        _values[index] = value

    @get = (key, def=null) ->
      index = _keys.indexOf key
      if index is -1 then def else _values[index]

    @each = (fn) ->
      fn key, _values[index] for key, index in _keys


module.exports = Map