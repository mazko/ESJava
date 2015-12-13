###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

# Naive order top -> bottom:
# public class t {}
# naive not impl but javac compatible
# class A extends B {}
# ok
# class B extends t {}


{MicroVisitor} = require '../GenericVisitor'
ClassBinding   = require './ClassBinding'
Dict           = require '../collections/Dict'


class CUBindingTypesVisitor extends MicroVisitor

  visitCompilationUnit: (node, args...) ->
    dict = new Dict
    @visit node.types, dict, args...
    bind = new Dict
    dict.each (k, v) ->
      bind.set_value k, v.name if v?.name and dict.contains v.name
    bind

  visitTypeDeclaration: (node, dict, args...) ->
    id = @visit node.name, args...
    su = @visit node.superclassType, args...
    interfaces = @visit node.superInterfaceTypes, args...
    interfaces = [su, interfaces...] if su
    su = switch interfaces.length
            when 0 then null
            when 1 then interfaces[0]
            else throw 'NotImpl: Multiple Inheritance'
    dict.set_value id.name, su


class CUNaiveBinding

  constructor: (cu_node) ->
    if cu_node.node isnt 'CompilationUnit'
      throw 'ASSERT: CompilationUnit node expected'

    visitor = new CUBindingTypesVisitor
    types = visitor.visit cu_node

    bindings = new Dict

    # fake ClassBinding by default
    @resolve_id = () -> null
    @bind = () ->

    @checkout_type = (cls_node) ->
      nm = cls_node.name?.identifier
      su = types.get_value nm
      binding = if su
        binding = bindings.get_value su
        binding.clone_super cls_node
      else
        new ClassBinding cls_node
      bindings.set_value nm, binding
      for key of binding
        @[key] = binding[key]


module.exports = CUNaiveBinding