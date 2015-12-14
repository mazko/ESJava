###
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
###

estypes    = require 'ast-types'
ASTVisitor = require './ASTVisitor'


builders = estypes.builders


class MicroVisitor extends ASTVisitor

  @make_def_field_init = (node) ->
    # https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html
    # Data Type Default Value (for fields)
    # boolean false
    # byte 0 short 0 int 0 long 0L 
    # float 0.0f double 0.0d
    # char '\u0000' 
    # String (or any object) null
    if node.node isnt 'FieldDeclaration'
      throw "ASSERT: FieldDeclaration expected instead #{node.node}"
    switch node.type?.primitiveTypeCode
      when 'long', 'short', 'byte', 'int' then node: 'NumberLiteral', 'token': '0'
      when 'float', 'double' then node: 'NumberLiteral', 'token': '0.0'
      when 'boolean' then node: 'BooleanLiteral', 'booleanValue': false
      when 'char' then node: 'CharacterLiteral', 'escapedValue': '\'\\u0000\''
      else node: 'NullLiteral'

  @has_modifier = (node, args...) ->
    mods = (mod.keyword for mod in node.modifiers when mod.keyword)
    intersected = MicroVisitor.intersection args, mods
    args.length and intersected.length is args.length

  visitSimpleType: (node, args...) ->
    @visit node.name, args...

  visitSimpleName: (node, args...) ->
    builders.identifier node.identifier

  visitPrimitiveType: (node, args...) ->
    builders.identifier node.primitiveTypeCode

  visitArrayType: (node, args...) ->
    type = @visit node.componentType, args...
    builders.identifier "Array:#{type.name}"

  visitQualifiedName: (node, args...) ->
    object   = @visit node.qualifier, args...
    property = @visit node.name, args...
    (lazy) ->
      [object, property] = lazy object, property
      builders.memberExpression object, property, no


class GenericVisitor extends MicroVisitor
  make_unary_or_update = (operator, args...) ->
    if operator in ['++', '--']
      builders.updateExpression operator, args...
    else
      builders.unaryExpression operator, args...

  make_binary_or_logical = (operator, args...) ->
    if operator in ['||', '&&']
      builders.logicalExpression operator, args...
    else
      builders.binaryExpression operator, args...

  conv_operator = (operator) ->
    switch operator
      when '==' then '==='
      when '!=' then '!=='
      else operator

  make_method = (id, params, body, is_static=no, kind='method') ->
    fn = builders.functionDeclaration id, params, body
    builders.methodDefinition kind, id, fn, is_static

  make_ctor = (params, body) ->
    id = builders.identifier 'constructor'
    make_method id, params, body, no, 'constructor'

  make_let = (declarations) ->
    builders.variableDeclaration 'let', declarations

  visitCompilationUnit: (node, args...) ->
    imports = @visit node.imports, args...
    body    = @visit node.types, args...
    (lazy) ->
      [statements] = lazy [imports..., body...]
      builders.program statements

  visitImportDeclaration: (node, args...) ->
    qualified = @visit node.name, args...
    items = do recurse = (node=qualified, res=[]) ->
      res.unshift node.name or node.property.name
      if node.object then recurse node.object, res else res
    items.push '*' if node.onDemand
    path = builders.literal items.join '.'
    builders.importDeclaration [], path

  visitNumberLiteral: (node) ->
    builders.literal parseInt node.token

  visitPrefixExpression: (node, args...) ->
    operand = @visit node.operand, args...
    make_unary_or_update node.operator, operand, yes

  visitArrayInitializer: (node, args...) ->
    elements = @visit node.expressions, args...
    builders.arrayExpression elements

  visitInfixExpression: (node, args...) ->
    left  = @visit node.leftOperand, args...
    right = @visit node.rightOperand, args...
    operator = conv_operator node.operator
    make_binary_or_logical operator, left, right

  visitStringLiteral: (node) ->
    builders.literal eval node.escapedValue

  visitBlock: (node, args...) ->
    builders.blockStatement @visit node.statements, args...

  visitVariableDeclarationStatement: (node, args...) ->
    declarations = @visit node.fragments, args...
    make_let declarations

  visitArrayCreation: (node, args...) ->
    init = @visit node.initializer, args...
    init or do =>
      dims = @visit node.dimensions, args...
      if dims.length > 0
        dims = [dims.reduce (left, right) ->
          builders.binaryExpression '*', left, right]
      array = builders.identifier 'Array'
      builders.newExpression array, dims

  visitExpressionStatement: (node, args...) ->
    expr = @visit node.expression, args...
    builders.expressionStatement expr

  visitAssignment: (node, args...) ->
    left  = @visit node.leftHandSide, args...
    right = @visit node.rightHandSide, args...
    builders.assignmentExpression node.operator, left, right

  visitReturnStatement: (node, args...) ->
    expr = @visit node.expression, args...
    builders.returnStatement expr

  visitSingleVariableDeclaration: (node, args...) ->
    @visit node.name, args...

  visitWhileStatement: (node, args...) ->
    expr = @visit node.expression, args...
    body = @visit node.body, args...
    builders.whileStatement expr, body

  visitPostfixExpression: (node, args...) ->
    operand = @visit node.operand, args...
    make_unary_or_update node.operator, operand, no

  visitDoStatement: (node, args...) ->
    expr = @visit node.expression, args...
    body = @visit node.body, args...
    builders.doWhileStatement body, expr

  visitArrayAccess: (node, args...) ->
    object   = @visit node.array, args...
    property = @visit node.index, args...
    builders.memberExpression object, property, yes

  visitBooleanLiteral: (node) ->
    builders.literal node.booleanValue

  visitThrowStatement: (node, args...) ->
    argument = @visit node.expression, args...
    builders.throwStatement argument

  visitClassInstanceCreation: (node, args...) ->
    params = @visit node.arguments, args...
    callee = @visit node.type, args...
    builders.newExpression callee, params

  visitTypeDeclaration: (node, args...) ->
    decls = @visit node.bodyDeclarations, args...
    id = @visit node.name, args...
    su = @visit node.superclassType, args...
    interfaces = @visit node.superInterfaceTypes, args...
    interfaces = [su, interfaces...] if su
    su = switch interfaces.length
            when 0 then null
            when 1 then interfaces[0]
            else throw 'NotImpl: Multiple Inheritance'
    (lazy) ->
      [id, decls, su] = lazy id, decls, su
      body = builders.classBody decls
      builders.classDeclaration id, body, su

  visitFieldAccess: (node, args...) ->
    id = @visit node.name, args...
    expr = @visit node.expression, args...
    (lazy) ->
      [id, expr] = lazy id, expr
      builders.memberExpression expr, id, no

  visitThisExpression: (node, args...) ->
    throw 'NotImpl: out class access' if node.qualifier
    builders.thisExpression()

  visitIfStatement: (node, args...) ->
    expr = @visit node.expression, args...
    alternate = @visit node.elseStatement, args...
    consequent = @visit node.thenStatement, args...
    builders.ifStatement expr, consequent, alternate

  visitCastExpression: (node, args...) ->
    @visit node.expression, args...

  visitNullLiteral: (node, args...) ->
    builders.literal null

  visitMethodDeclaration: (node, args...) ->
    id     = @visit node.name, args...
    params = @visit node.parameters, args...
    body   = @visit node.body, args...
    (lazy) =>
      [id, params, body] = lazy id, params, body
      if node.constructor
        make_ctor params, body
      else
        is_static = @constructor.has_modifier node, 'static'
        body ?= builders.blockStatement [
          builders.throwStatement builders.literal "NotImpl < #{id.name} >"
        ]
        make_method id, params, body, is_static

  visitFieldDeclaration: (node, args...) ->
    @constructor.IGNORE_ME

  visitVariableDeclarationFragment: (node, args...) ->
    id   = @visit node.name, args...
    init = @visit node.initializer, args...
    (lazy) ->
      [id, init] = lazy id, init
      builders.variableDeclarator id, init

  visitMethodInvocation: (node, args...) ->
    id      = @visit node.name, args...
    params  = @visit node.arguments, args...
    expr    = @visit node.expression, args...
    (lazy) ->
      [id, params, expr] = lazy id, params, expr
      id = builders.memberExpression expr, id, no if expr
      builders.callExpression id, params

  visitCatchClause: (node, args...) ->
    id   = @visit node.exception, args...
    type = @visit node.exception.type, args...
    body = @visit node.body, args...
    (lazy) ->
      [id, type, body] = lazy id, type, body
      builders.catchClause id, null, body

  visitTryStatement: (node, args...) ->
    [gid, cond] = []
    cats = (@visitCatchClause v, args... for v in node.catchClauses)
    for cat in cats.reverse()
      [aid, atype, abody] = [] 
      cat (cargs...) -> [aid, atype, abody] = cargs
      gid ?= aid
      if gid.name isnt aid.name
        init = make_let [builders.variableDeclarator aid, gid]
        abody.body.unshift init
      expr = builders.binaryExpression 'instanceof', gid, atype
      cond ?= builders.throwStatement gid
      cond = builders.ifStatement expr, abody, cond
    if cond
      cond = builders.blockStatement [cond]
      cond = builders.catchClause gid, null, cond
    final = @visit node.finally, args...
    body = @visit node.body, args...
    resources = @visit node.resources, args...
    throw 'NotImpl: try with resources' if resources?.length
    builders.tryStatement body, cond or null, final

  visitParenthesizedExpression: (node, args...) ->
    @visit node.expression, args...

  visitLabeledStatement: (node, args...) ->
    body = @visit node.body, args...
    label = @visit node.label, args...
    builders.labeledStatement label, body

  visitBreakStatement: (node, args...) ->
    label = @visit node.label, args...
    builders.breakStatement label

  visitContinueStatement: (node, args...) ->
    label = @visit node.label, args...
    builders.continueStatement label

  visitSwitchStatement: (node, args...) ->
    discriminant = @visit node.expression, args...
    cases = []
    for statement in @visit node.statements, args...
      if statement.type is 'SwitchCase'
        cases.push statement
      else
        [..., last] = cases
        last.consequent.push statement
    builders.switchStatement discriminant, cases

  visitSwitchCase: (node, args...) ->
    test = @visit node.expression, args...
    builders.switchCase test, []

  visitConditionalExpression: (node, args...) ->
    test = @visit node.expression, args...
    consequent = @visit node.thenExpression, args...
    alternate = @visit node.elseExpression, args...
    builders.conditionalExpression test, consequent, alternate

  visitSuperMethodInvocation: (node, args...) ->
    id      = @visit node.name, args...
    params  = @visit node.arguments, args...
    expr    = builders.super()
    (lazy) ->
      [id, params, expr] = lazy id, params, expr
      id = builders.memberExpression expr, id, no
      builders.callExpression id, params

  visitSuperFieldAccess: (node, args...) ->
    id   = @visit node.name, args...
    expr = builders.super()
    (lazy) ->
      [id, expr] = lazy id, expr
      builders.memberExpression expr, id, no

  visitSuperConstructorInvocation: (node, args...) ->
    params  = @visit node.arguments, args...
    expr    = builders.super()
    (lazy) ->
      [params, expr] = lazy params, expr
      call = builders.callExpression expr, params
      builders.expressionStatement call

  visitInstanceofExpression: (node, args...) ->
    left  = @visit node.leftOperand, args...
    right = @visit node.rightOperand, args...
    builders.binaryExpression 'instanceof', left, right

  visitEmptyStatement: (node, args...) ->
    builders.emptyStatement()

  visitForStatement: (node, args...) ->
    wrap_seq = (items) ->
      switch items.length
        when 1 then items[0]
        when 0 then null
        else builders.sequenceExpression items
    init   = wrap_seq @visit node.initializers, args...
    test   = @visit node.expression, args...
    update = wrap_seq @visit node.updaters, args...
    body   = @visit node.body, args...
    builders.forStatement init, test, update, body

  visitVariableDeclarationExpression: (node, args...) ->
    declarations = @visit node.fragments, args...
    make_let declarations

  visitCharacterLiteral: (node, args...) ->
    builders.literal eval node.escapedValue


module.exports = {MicroVisitor, GenericVisitor}