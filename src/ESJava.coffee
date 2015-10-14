###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

javaparser   = require '../lib/javaparser7'
SuperVisitor = require './OverloadVisitor'
Scope        = require './binding/BindingScope'
estypes      = require 'ast-types'
esgen        = require 'escodegen'


estypes.Type.def 'RawLiteral'
  .bases 'Node', 'Expression'
  .build 'x-raw'
  .field 'x-raw', Object
estypes.finalize()


builders = estypes.builders


class PrimitivesVisitor extends SuperVisitor

  # TODO: research & take best from TypeScript strong typing impl
  visitMethodInvocation: (node, binding, args...) ->
    su = super node, binding, args...
    callee = no
    res = su (id, params, expr) =>
      if expr 
        is_str = (tp) -> tp and esgen.generate(tp) in ['String', 'java.lang.String']
        is_str_expr = -> 
          resolve = (ex, scope) ->
            res = binding.resolve_id ex
            if res?.scope is scope
              is_str res.type
            else 
              null
          if expr.type is 'Identifier'
            resolve expr, Scope.LOCAL
          else if expr.object?.type is 'ThisExpression' and expr.property?.type is 'Identifier'
            resolve expr.property, Scope.FIELD
          else if expr.callee?.object?.type is 'ThisExpression' and expr.callee?.property?.type is 'Identifier'
            resolve expr.callee.property, Scope.METHOD
          # static
          else if expr.object?.type is 'Identifier' and expr.property?.type is 'Identifier' and expr.object?.name is binding.class_id.name
            resolve expr.property, Scope.FIELD
          else if expr.callee?.object?.type is 'Identifier' and expr.callee?.property?.type is 'Identifier' and expr.callee?.object?.name is binding.class_id.name
            resolve expr.callee.property, Scope.METHOD
          else
            no
  
        # if id.name in ['length','charAt'] and not is_str_expr()
        #   console.log @constructor.dump expr

        if id.name is 'charAt' and is_str_expr()
          id.name = 'charCodeAt'
        else if id.name is 'length' and is_str_expr()
          callee = yes
      [id, params, expr]
    if callee then res.callee else res 


class RawVisitor extends PrimitivesVisitor

  octal_to_unicode = (str) ->
    str.replace /\\([1-7][0-7]{0,2}|[0-7]{2,3})/g, (match, p1) ->
      num = parseInt p1, 8
      '\\u' + "000#{num.toString 16}".slice -4

  make_raw = (value)->
    obj = content: value, precedence: esgen.Precedence.Primary
    builders.rawLiteral obj

  visitNumberLiteral: (node) ->
    token = node.token.replace /[lLfFdD]$/, ''
    make_raw token.replace /^0([0-7]+)$/, '0o$1'

  visitStringLiteral: (node) ->
    make_raw octal_to_unicode node.escapedValue

  visitCharacterLiteral: (node) ->
    make_raw octal_to_unicode node.escapedValue


# class SuppressImportsVisitor extends PrimitivesVisitor
#   visitImportDeclaration: (node) ->
#     @constructor.IGNORE_ME


module.exports = (src) -> 
  jast = javaparser.parse src
  #console.log "var ast = #{SuperVisitor.dump jast}"
  jsast = new RawVisitor().visit jast
  #console.log SuperVisitor.dump jsast
  esgen.generate jsast, verbatim: 'x-raw'