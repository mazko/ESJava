###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###


class BindingScope

  @LOCAL:  'local',
  @FIELD:  'field',
  @METHOD: 'method'

  constructor: (@scope, @type, @is_static=no) ->

  @new_local: (args...) ->
    new BindingScope BindingScope.LOCAL, args...

  @new_field: (args...) ->
    new BindingScope BindingScope.FIELD, args...

  @new_method: (args...) ->
    new BindingScope BindingScope.METHOD, args...


module.exports = BindingScope