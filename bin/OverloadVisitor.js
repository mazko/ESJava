// Generated by CoffeeScript 1.10.0

/*
@author  Oleg Mazko <o.mazko@mail.ru>
@license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

(function() {
  var OverloadVisitor, SuperVisitor, estypes,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  SuperVisitor = require('./ResolveSelfVisitor');

  estypes = require('ast-types');

  OverloadVisitor = (function(superClass) {
    var builders, make_method;

    extend(OverloadVisitor, superClass);

    function OverloadVisitor() {
      return OverloadVisitor.__super__.constructor.apply(this, arguments);
    }

    builders = estypes.builders;

    make_method = function(id, params, body, is_static, kind) {
      var fn;
      if (is_static == null) {
        is_static = false;
      }
      if (kind == null) {
        kind = 'method';
      }
      fn = builders.functionDeclaration(id, params, body);
      return builders.methodDefinition(kind, id, fn, is_static);
    };

    OverloadVisitor.prototype.visitTypeDeclaration = function() {
      var args, binding, node, su;
      node = arguments[0], binding = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      su = OverloadVisitor.__super__.visitTypeDeclaration.apply(this, [node, binding].concat(slice.call(args)));
      return function(lazy) {
        return su(function() {
          var __args, __binding, __decls, __id, body, call, cases, def_call, discriminant, expr, i, j, len, meth, nm, o, par_cnt, ref, rest, sw, test;
          __id = arguments[0], __decls = arguments[1], __args = 4 <= arguments.length ? slice.call(arguments, 2, i = arguments.length - 1) : (i = 2, []), __binding = arguments[i++];
          ref = __binding.ls_potential_overloads();
          for (j = 0, len = ref.length; j < len; j++) {
            o = ref[j];
            expr = o["static"] ? __binding.class_id : builders.thisExpression();
            rest = builders.identifier('args');
            cases = (function() {
              var k, len1, ref1, results;
              ref1 = o.pars;
              results = [];
              for (k = 0, len1 = ref1.length; k < len1; k++) {
                par_cnt = ref1[k];
                nm = builders.identifier(__binding.overload(o.name, new Array(par_cnt)));
                call = builders.memberExpression(expr, nm, false);
                call = builders.callExpression(call, [builders.spreadElement(rest)]);
                test = builders.literal(par_cnt);
                results.push(builders.switchCase(test, [builders.returnStatement(call)]));
              }
              return results;
            })();
            discriminant = builders.memberExpression(rest, builders.identifier('length'));
            sw = builders.switchStatement(discriminant, cases);
            meth = builders.identifier(o.name);
            def_call = builders.memberExpression(builders["super"](), meth);
            def_call = builders.callExpression(def_call, [builders.spreadElement(rest)]);
            body = builders.blockStatement([sw, builders.returnStatement(def_call)]);
            __decls.push(make_method(meth, [builders.restElement(rest)], body, o["static"]));
          }
          return lazy.apply(null, [__id, __decls].concat(slice.call(__args), [__binding]));
        });
      };
    };

    OverloadVisitor.prototype.visitMethodDeclaration = function() {
      var args, binding, node, su;
      node = arguments[0], binding = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      su = OverloadVisitor.__super__.visitMethodDeclaration.apply(this, [node, binding].concat(slice.call(args)));
      return function(lazy) {
        return su(function(id, params, body, locals) {
          if (!node.constructor) {
            id.name = binding.overload(id.name, params);
          }
          return lazy(id, params, body, locals);
        });
      };
    };

    OverloadVisitor.prototype.visitMethodInvocation = function() {
      var args, binding, node, su;
      node = arguments[0], binding = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      su = OverloadVisitor.__super__.visitMethodInvocation.apply(this, [node, binding].concat(slice.call(args)));
      return function(lazy) {
        return su(function(id, params, expr) {
          var do_overload;
          do_overload = (expr != null ? expr.type : void 0) === 'ThisExpression';
          do_overload || (do_overload = (expr != null ? expr.type : void 0) === 'Identifier' && (expr != null ? expr.name : void 0) === binding.class_id.name);
          if (do_overload) {
            id.name = binding.overload(id.name, params);
          }
          return lazy(id, params, expr);
        });
      };
    };

    return OverloadVisitor;

  })(SuperVisitor);

  module.exports = OverloadVisitor;

}).call(this);
