'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('java.io.IOException');

require('org.apache.lucene.analysis.Tokenizer');

require('org.apache.lucene.analysis.tokenattributes.CharTermAttribute');

require('org.apache.lucene.analysis.tokenattributes.OffsetAttribute');

require('org.apache.lucene.analysis.tokenattributes.PositionIncrementAttribute');

require('org.apache.lucene.analysis.tokenattributes.TypeAttribute');

require('org.apache.lucene.util.AttributeFactory');

require('java.io.Reader');

var StandardTokenizer = (function (_Tokenizer) {
    _inherits(StandardTokenizer, _Tokenizer);

    _createClass(StandardTokenizer, null, [{
        key: 'ALPHANUM',
        get: function get() {
            return 0;
        }
    }, {
        key: 'APOSTROPHE',
        get: function get() {
            return 1;
        }
    }, {
        key: 'ACRONYM',
        get: function get() {
            return 2;
        }
    }, {
        key: 'COMPANY',
        get: function get() {
            return 3;
        }
    }, {
        key: 'EMAIL',
        get: function get() {
            return 4;
        }
    }, {
        key: 'HOST',
        get: function get() {
            return 5;
        }
    }, {
        key: 'NUM',
        get: function get() {
            return 6;
        }
    }, {
        key: 'CJ',
        get: function get() {
            return 7;
        }
    }, {
        key: 'ACRONYM_DEP',
        get: function get() {
            return 8;
        }
    }, {
        key: 'SOUTHEAST_ASIAN',
        get: function get() {
            return 9;
        }
    }, {
        key: 'IDEOGRAPHIC',
        get: function get() {
            return 10;
        }
    }, {
        key: 'HIRAGANA',
        get: function get() {
            return 11;
        }
    }, {
        key: 'KATAKANA',
        get: function get() {
            return 12;
        }
    }, {
        key: 'HANGUL',
        get: function get() {
            return 13;
        }
    }, {
        key: 'TOKEN_TYPES',
        get: function get() {
            delete StandardTokenizer.TOKEN_TYPES;
            return StandardTokenizer.TOKEN_TYPES = ["<ALPHANUM>", "<APOSTROPHE>", "<ACRONYM>", "<COMPANY>", "<EMAIL>", "<HOST>", "<NUM>", "<CJ>", "<ACRONYM_DEP>", "<SOUTHEAST_ASIAN>", "<IDEOGRAPHIC>", "<HIRAGANA>", "<KATAKANA>", "<HANGUL>"];
        }
    }, {
        key: 'MAX_TOKEN_LENGTH_LIMIT',
        get: function get() {
            return 1024 * 1024;
        }
    }]);

    function StandardTokenizer() {
        _classCallCheck(this, StandardTokenizer);

        _get(Object.getPrototypeOf(StandardTokenizer.prototype), 'constructor', this).call(this);
        this.scanner = null;
    }

    return StandardTokenizer;
})(Tokenizer);

var ClassicTokenizerImpl = (function () {
    _createClass(ClassicTokenizerImpl, [{
        key: 'yychar$fixed',
        value: function yychar$fixed() {
            return this.yychar;
        }
    }, {
        key: 'getText',
        value: function getText(t) {
            t.copyBuffer(this.zzBuffer, this.zzStartRead, this.zzMarkedPos - this.zzStartRead);
        }
    }, {
        key: 'setBufferSize',
        value: function setBufferSize(numChars) {
            throw new UnsupportedOperationException();
        }
    }], [{
        key: 'zzUnpackAction$0',
        value: function zzUnpackAction$0() {
            var result = new Array(50);
            var offset = 0;
            offset = ClassicTokenizerImpl.zzUnpackAction$3(ClassicTokenizerImpl.ZZ_ACTION_PACKED_0, offset, result);
            return result;
        }
    }, {
        key: 'zzUnpackAction$3',
        value: function zzUnpackAction$3(packed, offset, result) {
            var i = 0;
            var j = offset;
            var l = packed.length;
            while (i < l) {
                var count = packed.charCodeAt(i++);
                var value = packed.charCodeAt(i++);
                do result[j++] = value; while (--count > 0);
            }
            return j;
        }
    }, {
        key: 'zzUnpackRowMap$0',
        value: function zzUnpackRowMap$0() {
            var result = new Array(50);
            var offset = 0;
            offset = ClassicTokenizerImpl.zzUnpackRowMap$3(ClassicTokenizerImpl.ZZ_ROWMAP_PACKED_0, offset, result);
            return result;
        }
    }, {
        key: 'zzUnpackRowMap$3',
        value: function zzUnpackRowMap$3(packed, offset, result) {
            var i = 0;
            var j = offset;
            var l = packed.length;
            while (i < l) {
                var high = packed.charCodeAt(i++) << 16;
                result[j++] = high | packed.charCodeAt(i++);
            }
            return j;
        }
    }, {
        key: 'zzUnpackTrans$0',
        value: function zzUnpackTrans$0() {
            var result = new Array(552);
            var offset = 0;
            offset = ClassicTokenizerImpl.zzUnpackTrans$3(ClassicTokenizerImpl.ZZ_TRANS_PACKED_0, offset, result);
            return result;
        }
    }, {
        key: 'zzUnpackTrans$3',
        value: function zzUnpackTrans$3(packed, offset, result) {
            var i = 0;
            var j = offset;
            var l = packed.length;
            while (i < l) {
                var count = packed.charCodeAt(i++);
                var value = packed.charCodeAt(i++);
                value--;
                do result[j++] = value; while (--count > 0);
            }
            return j;
        }
    }, {
        key: 'zzUnpackAttribute$0',
        value: function zzUnpackAttribute$0() {
            var result = new Array(50);
            var offset = 0;
            offset = ClassicTokenizerImpl.zzUnpackAttribute$3(ClassicTokenizerImpl.ZZ_ATTRIBUTE_PACKED_0, offset, result);
            return result;
        }
    }, {
        key: 'zzUnpackAttribute$3',
        value: function zzUnpackAttribute$3(packed, offset, result) {
            var i = 0;
            var j = offset;
            var l = packed.length;
            while (i < l) {
                var count = packed.charCodeAt(i++);
                var value = packed.charCodeAt(i++);
                do result[j++] = value; while (--count > 0);
            }
            return j;
        }
    }, {
        key: 'YYEOF',
        get: function get() {
            return -1;
        }
    }, {
        key: 'ZZ_BUFFERSIZE',
        get: function get() {
            return 4096;
        }
    }, {
        key: 'YYINITIAL',
        get: function get() {
            return 0;
        }
    }, {
        key: 'ZZ_LEXSTATE',
        get: function get() {
            delete ClassicTokenizerImpl.ZZ_LEXSTATE;
            return ClassicTokenizerImpl.ZZ_LEXSTATE = [0, 0];
        }
    }, {
        key: 'ZZ_CMAP_PACKED',
        get: function get() {
            return '&\u0000\u0001\u0005\u0001\u0003\u0004\u0000\u0001\t\u0001\u0007\u0001\u0004\u0001\t\n\u0002\u0006\u0000' + '\u0001\u0006\u001a\n\u0004\u0000\u0001\b\u0001\u0000\u001a\n/\u0000\u0001\n\n\u0000\u0001\n' + '\u0004\u0000\u0001\n\u0005\u0000\u0017\n\u0001\u0000\u001f\n\u0001\u0000Ĩ\n\u0002\u0000\u0012\n' + '\u001c\u0000^\n\u0002\u0000\t\n\u0002\u0000\u0007\n\u000e\u0000\u0002\n\u000e\u0000\u0005\n' + '\t\u0000\u0001\n\u0000\u0001\n\u000b\u0000\u0001\n\u0001\u0000\u0003\n\u0001\u0000\u0001\n' + '\u0001\u0000\u0014\n\u0001\u0000,\n\u0001\u0000\b\n\u0002\u0000\u001a\n\f\u0000\n' + '\n\u00009\n\u0002\u0000\u0002\n\u0002\u0000\u0002\n\u0003\u0000&\n\u0002\u0000\u0002\n' + '7\u0000&\n\u0002\u0000\u0001\n\u0007\u0000\'\nH\u0000\u001b\n\u0005\u0000\u0003\n' + '.\u0000\u001a\n\u0005\u0000\u000b\n\u0015\u0000\n\u0002\u0007\u0000c\n\u0001\u0000\u0001\n' + '\u000f\u0000\u0002\n\t\u0000\n\u0002\u0003\n\u0013\u0000\u0001\n\u0001\u0000\u001b\nS\u0000' + '&\nş\u00005\n\u0003\u0000\u0001\n\u0012\u0000\u0001\n\u0007\u0000\n\n\u0004\u0000' + '\n\u0002\u0015\u0000\b\n\u0002\u0000\u0002\n\u0002\u0000\u0016\n\u0001\u0000\u0007\n\u0001\u0000' + '\u0001\n\u0003\u0000\u0004\n"\u0000\u0002\n\u0001\u0000\u0003\n\u0004\u0000\n\u0002\u0002\n' + '\u0013\u0000\u0006\n\u0004\u0000\u0002\n\u0002\u0000\u0016\n\u0001\u0000\u0007\n\u0001\u0000\u0002\n' + '\u0001\u0000\u0002\n\u0001\u0000\u0002\n\u001f\u0000\u0004\n\u0001\u0000\u0001\n\u0007\u0000\n\u0002' + '\u0002\u0000\u0003\n\u0010\u0000\u0007\n\u0001\u0000\u0001\n\u0001\u0000\u0003\n\u0001\u0000\u0016\n' + '\u0001\u0000\u0007\n\u0001\u0000\u0002\n\u0001\u0000\u0005\n\u0003\u0000\u0001\n\u0012\u0000\u0001\n' + '\u000f\u0000\u0001\n\u0005\u0000\n\u0002\u0015\u0000\b\n\u0002\u0000\u0002\n\u0002\u0000\u0016\n' + '\u0001\u0000\u0007\n\u0001\u0000\u0002\n\u0002\u0000\u0004\n\u0003\u0000\u0001\n\u001e\u0000\u0002\n' + '\u0001\u0000\u0003\n\u0004\u0000\n\u0002\u0015\u0000\u0006\n\u0003\u0000\u0003\n\u0001\u0000\u0004\n' + '\u0003\u0000\u0002\n\u0001\u0000\u0001\n\u0001\u0000\u0002\n\u0003\u0000\u0002\n\u0003\u0000\u0003\n' + '\u0003\u0000\b\n\u0001\u0000\u0003\n-\u0000\t\u0002\u0015\u0000\b\n\u0001\u0000\u0003\n' + '\u0001\u0000\u0017\n\u0001\u0000\n\n\u0001\u0000\u0005\n&\u0000\u0002\n\u0004\u0000\n\u0002' + '\u0015\u0000\b\n\u0001\u0000\u0003\n\u0001\u0000\u0017\n\u0001\u0000\n\n\u0001\u0000\u0005\n' + '$\u0000\u0001\n\u0001\u0000\u0002\n\u0004\u0000\n\u0002\u0015\u0000\b\n\u0001\u0000\u0003\n' + '\u0001\u0000\u0017\n\u0001\u0000\u0010\n&\u0000\u0002\n\u0004\u0000\n\u0002\u0015\u0000\u0012\n' + '\u0003\u0000\u0018\n\u0001\u0000\t\n\u0001\u0000\u0001\n\u0002\u0000\u0007\n9\u0000\u0001\u0001' + '0\n\u0001\u0001\u0002\n\f\u0001\u0007\n\t\u0001\n\u0002\'\u0000\u0002\n\u0001\u0000' + '\u0001\n\u0002\u0000\u0002\n\u0001\u0000\u0001\n\u0002\u0000\u0001\n\u0006\u0000\u0004\n\u0001\u0000' + '\u0007\n\u0001\u0000\u0003\n\u0001\u0000\u0001\n\u0001\u0000\u0001\n\u0002\u0000\u0002\n\u0001\u0000' + '\u0004\n\u0001\u0000\u0002\n\t\u0000\u0001\n\u0002\u0000\u0005\n\u0001\u0000\u0001\n\t\u0000' + '\n\u0002\u0002\u0000\u0002\n"\u0000\u0001\n\u001f\u0000\n\u0002\u0016\u0000\b\n\u0001\u0000' + '"\n\u001d\u0000\u0004\nt\u0000"\n\u0001\u0000\u0005\n\u0001\u0000\u0002\n\u0015\u0000' + '\n\u0002\u0006\u0000\u0006\nJ\u0000&\n\n\u0000\'\n\t\u0000Z\n\u0005\u0000' + 'D\n\u0005\u0000R\n\u0006\u0000\u0007\n\u0001\u0000?\n\u0001\u0000\u0001\n\u0001\u0000' + '\u0004\n\u0002\u0000\u0007\n\u0001\u0000\u0001\n\u0001\u0000\u0004\n\u0002\u0000\'\n\u0001\u0000' + '\u0001\n\u0001\u0000\u0004\n\u0002\u0000\u001f\n\u0001\u0000\u0001\n\u0001\u0000\u0004\n\u0002\u0000' + '\u0007\n\u0001\u0000\u0001\n\u0001\u0000\u0004\n\u0002\u0000\u0007\n\u0001\u0000\u0007\n\u0001\u0000' + '\u0017\n\u0001\u0000\u001f\n\u0001\u0000\u0001\n\u0001\u0000\u0004\n\u0002\u0000\u0007\n\u0001\u0000' + '\'\n\u0001\u0000\u0013\n\u000e\u0000\t\u0002.\u0000U\n\f\u0000ɬ\n\u0002\u0000' + '\b\n\n\u0000\u001a\n\u0005\u0000K\n\u00004\n,\u0000\n\u0002&\u0000' + '\n\u0002\u0006\u0000X\n\b\u0000)\n՗\u0000\n\u0004\u0000Z\n\u0006\u0000' + '\u0016\n\u0002\u0000\u0006\n\u0002\u0000&\n\u0002\u0000\u0006\n\u0002\u0000\b\n\u0001\u0000' + '\u0001\n\u0001\u0000\u0001\n\u0001\u0000\u0001\n\u0001\u0000\u001f\n\u0002\u00005\n\u0001\u0000' + '\u0007\n\u0001\u0000\u0001\n\u0003\u0000\u0003\n\u0001\u0000\u0007\n\u0003\u0000\u0004\n\u0002\u0000' + '\u0006\n\u0004\u0000\r\n\u0005\u0000\u0003\n\u0001\u0000\u0007\n\u0000\u0001\n\u0000' + '\u0001\n\u0004\u0000\u0001\n\u0002\u0000\n\n\u0001\u0000\u0001\n\u0003\u0000\u0005\n\u0006\u0000' + '\u0001\n\u0001\u0000\u0001\n\u0001\u0000\u0001\n\u0001\u0000\u0004\n\u0001\u0000\u0003\n\u0001\u0000' + '\u0007\n໋\u0000\u0002\n*\u0000\u0005\n\n\u0000\u0001\u000bT\u000b\b\u000b\u0002\u000b' + '\u0002\u000bZ\u000b\u0001\u000b\u0003\u000b\u0006\u000b(\u000b\u0003\u000b\u0001\u0000^\n\u0011\u0000' + '\u0018\n8\u0000\u0010\u000bĀ\u0000\u000b\u0000ᦶ\u000b\n\u000b@\u0000冦\u000b' + 'Z\u000bҍ\nݳ\u0000⮤\n⅜\u0000Į\u000bÒ\u000b\u0007\n\f\u0000\u0005\n' + '\u0005\u0000\u0001\n\u0001\u0000\n\n\u0001\u0000\r\n\u0001\u0000\u0005\n\u0001\u0000\u0001\n' + '\u0001\u0000\u0002\n\u0001\u0000\u0002\n\u0001\u0000l\n!\u0000ū\n\u0012\u0000@\n' + '\u0002\u00006\n(\u0000\f\nt\u0000\u0003\n\u0001\u0000\u0001\n\u0001\u0000\n' + '\u0013\u0000\n\u0002\u0007\u0000\u001a\n\u0006\u0000\u001a\n\n\u0000\u0001\u000b:\u000b\u001f\n' + '\u0003\u0000\u0006\n\u0002\u0000\u0006\n\u0002\u0000\u0006\n\u0002\u0000\u0003\n￿\u0000￿\u0000￿\u0000￿\u0000￿\u0000￿\u0000￿\u0000￿\u0000￿\u0000￿\u0000￿\u0000￿\u0000￿\u0000￿\u0000￿\u0000￿\u00003\u0000';
        }
    }, {
        key: 'ZZ_CMAP',
        get: function get() {
            delete ClassicTokenizerImpl.ZZ_CMAP;
            return ClassicTokenizerImpl.ZZ_CMAP = ClassicTokenizerImpl.zzUnpackCMap(ClassicTokenizerImpl.ZZ_CMAP_PACKED);
        }
    }, {
        key: 'ZZ_ACTION',
        get: function get() {
            delete ClassicTokenizerImpl.ZZ_ACTION;
            return ClassicTokenizerImpl.ZZ_ACTION = ClassicTokenizerImpl.zzUnpackAction$0();
        }
    }, {
        key: 'ZZ_ACTION_PACKED_0',
        get: function get() {
            return '\u0001\u0000\u0001\u0001\u0003\u0002\u0001\u0003\u000b\u0000\u0001\u0002\u0003\u0004\u0002\u0000' + '\u0001\u0005\u0001\u0000\u0001\u0005\u0003\u0004\u0006\u0005\u0001\u0006\u0001\u0004\u0002\u0007' + '\u0001\b\u0001\u0000\u0001\b\u0003\u0000\u0002\b\u0001\t\u0001\n\u0001\u0004';
        }
    }, {
        key: 'ZZ_ROWMAP',
        get: function get() {
            delete ClassicTokenizerImpl.ZZ_ROWMAP;
            return ClassicTokenizerImpl.ZZ_ROWMAP = ClassicTokenizerImpl.zzUnpackRowMap$0();
        }
    }, {
        key: 'ZZ_ROWMAP_PACKED_0',
        get: function get() {
            return '\u0000\u0000\u0000\f\u0000\u0018\u0000$\u00000\u0000\f\u0000<\u0000H' + '\u0000T\u0000`\u0000l\u0000x\u0000\u0000\u0000\u0000¨' + '\u0000´\u0000À\u0000Ì\u0000Ø\u0000ä\u0000ð\u0000ü\u0000Ĉ' + '\u0000Ĕ\u0000Ġ\u0000Ĭ\u0000ĸ\u0000ń\u0000Ő\u0000Ŝ\u0000Ũ' + '\u0000Ŵ\u0000ƀ\u0000ƌ\u0000Ƙ\u0000Ƥ\u0000¨\u0000ư\u0000Ƽ' + '\u0000ǈ\u0000ǔ\u0000Ǡ\u0000Ǭ\u0000Ǹ\u0000<\u0000l\u0000Ȅ' + '\u0000Ȑ\u0000Ȝ';
        }
    }, {
        key: 'ZZ_TRANS',
        get: function get() {
            delete ClassicTokenizerImpl.ZZ_TRANS;
            return ClassicTokenizerImpl.ZZ_TRANS = ClassicTokenizerImpl.zzUnpackTrans$0();
        }
    }, {
        key: 'ZZ_TRANS_PACKED_0',
        get: function get() {
            return '\u0001\u0002\u0001\u0003\u0001\u0004\u0007\u0002\u0001\u0005\u0001\u0006\r\u0000\u0002\u0003' + '\u0001\u0000\u0001\u0007\u0001\u0000\u0001\b\u0002\t\u0001\n\u0001\u0003\u0002\u0000' + '\u0001\u0003\u0001\u0004\u0001\u0000\u0001\u000b\u0001\u0000\u0001\b\u0002\f\u0001\r' + '\u0001\u0004\u0002\u0000\u0001\u0003\u0001\u0004\u0001\u000e\u0001\u000f\u0001\u0010\u0001\u0011' + '\u0002\t\u0001\n\u0001\u0012\u0002\u0000\u0001\u0013\u0001\u0014\u0007\u0000\u0001\u0015' + '\u0002\u0000\u0002\u0016\u0007\u0000\u0001\u0016\u0002\u0000\u0001\u0017\u0001\u0018\u0007\u0000' + '\u0001\u0019\u0003\u0000\u0001\u001a\u0007\u0000\u0001\n\u0002\u0000\u0001\u001b\u0001\u001c' + '\u0007\u0000\u0001\u001d\u0002\u0000\u0001\u001e\u0001\u001f\u0007\u0000\u0001 \u0002\u0000' + '\u0001!\u0001"\u0007\u0000\u0001#\u000b\u0000\u0001$\u0002\u0000\u0001\u0013' + '\u0001\u0014\u0007\u0000\u0001%\u000b\u0000\u0001&\u0002\u0000\u0002\u0016\u0007\u0000' + '\u0001\'\u0002\u0000\u0001\u0003\u0001\u0004\u0001\u000e\u0001\u0007\u0001\u0010\u0001\u0011' + '\u0002\t\u0001\n\u0001\u0012\u0002\u0000\u0002\u0013\u0001\u0000\u0001(\u0001\u0000' + '\u0001\b\u0002)\u0001\u0000\u0001\u0013\u0002\u0000\u0001\u0013\u0001\u0014\u0001\u0000' + '\u0001*\u0001\u0000\u0001\b\u0002+\u0001,\u0001\u0014\u0002\u0000\u0001\u0013' + '\u0001\u0014\u0001\u0000\u0001(\u0001\u0000\u0001\b\u0002)\u0001\u0000\u0001\u0015' + '\u0002\u0000\u0002\u0016\u0001\u0000\u0001-\u0002\u0000\u0001-\u0002\u0000\u0001\u0016' + '\u0002\u0000\u0002\u0017\u0001\u0000\u0001)\u0001\u0000\u0001\b\u0002)\u0001\u0000' + '\u0001\u0017\u0002\u0000\u0001\u0017\u0001\u0018\u0001\u0000\u0001+\u0001\u0000\u0001\b' + '\u0002+\u0001,\u0001\u0018\u0002\u0000\u0001\u0017\u0001\u0018\u0001\u0000\u0001)' + '\u0001\u0000\u0001\b\u0002)\u0001\u0000\u0001\u0019\u0003\u0000\u0001\u001a\u0001\u0000' + '\u0001,\u0002\u0000\u0003,\u0001\u001a\u0002\u0000\u0002\u001b\u0001\u0000\u0001.' + '\u0001\u0000\u0001\b\u0002\t\u0001\n\u0001\u001b\u0002\u0000\u0001\u001b\u0001\u001c' + '\u0001\u0000\u0001/\u0001\u0000\u0001\b\u0002\f\u0001\r\u0001\u001c\u0002\u0000' + '\u0001\u001b\u0001\u001c\u0001\u0000\u0001.\u0001\u0000\u0001\b\u0002\t\u0001\n' + '\u0001\u001d\u0002\u0000\u0002\u001e\u0001\u0000\u0001\t\u0001\u0000\u0001\b\u0002\t' + '\u0001\n\u0001\u001e\u0002\u0000\u0001\u001e\u0001\u001f\u0001\u0000\u0001\f\u0001\u0000' + '\u0001\b\u0002\f\u0001\r\u0001\u001f\u0002\u0000\u0001\u001e\u0001\u001f\u0001\u0000' + '\u0001\t\u0001\u0000\u0001\b\u0002\t\u0001\n\u0001 \u0002\u0000\u0002!' + '\u0001\u0000\u0001\n\u0002\u0000\u0003\n\u0001!\u0002\u0000\u0001!\u0001"' + '\u0001\u0000\u0001\r\u0002\u0000\u0003\r\u0001"\u0002\u0000\u0001!\u0001"' + '\u0001\u0000\u0001\n\u0002\u0000\u0003\n\u0001#\u0004\u0000\u0001\u000e\u0006\u0000' + '\u0001$\u0002\u0000\u0001\u0013\u0001\u0014\u0001\u0000\u00010\u0001\u0000\u0001\b' + '\u0002)\u0001\u0000\u0001\u0015\u0002\u0000\u0002\u0016\u0001\u0000\u0001-\u0002\u0000' + '\u0001-\u0002\u0000\u0001\'\u0002\u0000\u0002\u0013\u0007\u0000\u0001\u0013\u0002\u0000' + '\u0002\u0017\u0007\u0000\u0001\u0017\u0002\u0000\u0002\u001b\u0007\u0000\u0001\u001b\u0002\u0000' + '\u0002\u001e\u0007\u0000\u0001\u001e\u0002\u0000\u0002!\u0007\u0000\u0001!\u0002\u0000' + '\u00021\u0007\u0000\u00011\u0002\u0000\u0002\u0013\u0007\u0000\u00012\u0002\u0000' + '\u00021\u0001\u0000\u0001-\u0002\u0000\u0001-\u0002\u0000\u00011\u0002\u0000' + '\u0002\u0013\u0001\u0000\u00010\u0001\u0000\u0001\b\u0002)\u0001\u0000\u0001\u0013' + '\u0001\u0000';
        }
    }, {
        key: 'ZZ_UNKNOWN_ERROR',
        get: function get() {
            return 0;
        }
    }, {
        key: 'ZZ_NO_MATCH',
        get: function get() {
            return 1;
        }
    }, {
        key: 'ZZ_PUSHBACK_2BIG',
        get: function get() {
            return 2;
        }
    }, {
        key: 'ZZ_ERROR_MSG',
        get: function get() {
            delete ClassicTokenizerImpl.ZZ_ERROR_MSG;
            return ClassicTokenizerImpl.ZZ_ERROR_MSG = ["Unkown internal scanner error", "Error: could not match input", "Error: pushback value was too large"];
        }
    }, {
        key: 'ZZ_ATTRIBUTE',
        get: function get() {
            delete ClassicTokenizerImpl.ZZ_ATTRIBUTE;
            return ClassicTokenizerImpl.ZZ_ATTRIBUTE = ClassicTokenizerImpl.zzUnpackAttribute$0();
        }
    }, {
        key: 'ZZ_ATTRIBUTE_PACKED_0',
        get: function get() {
            return '\u0001\u0000\u0001\t\u0003\u0001\u0001\t\u000b\u0000\u0004\u0001\u0002\u0000\u0001\u0001' + '\u0001\u0000\u000f\u0001\u0001\u0000\u0001\u0001\u0003\u0000\u0005\u0001';
        }
    }, {
        key: 'ALPHANUM',
        get: function get() {
            return StandardTokenizer.ALPHANUM;
        }
    }, {
        key: 'APOSTROPHE',
        get: function get() {
            return StandardTokenizer.APOSTROPHE;
        }
    }, {
        key: 'ACRONYM',
        get: function get() {
            return StandardTokenizer.ACRONYM;
        }
    }, {
        key: 'COMPANY',
        get: function get() {
            return StandardTokenizer.COMPANY;
        }
    }, {
        key: 'EMAIL',
        get: function get() {
            return StandardTokenizer.EMAIL;
        }
    }, {
        key: 'HOST',
        get: function get() {
            return StandardTokenizer.HOST;
        }
    }, {
        key: 'NUM',
        get: function get() {
            return StandardTokenizer.NUM;
        }
    }, {
        key: 'CJ',
        get: function get() {
            return StandardTokenizer.CJ;
        }
    }, {
        key: 'ACRONYM_DEP',
        get: function get() {
            return StandardTokenizer.ACRONYM_DEP;
        }
    }, {
        key: 'TOKEN_TYPES',
        get: function get() {
            delete ClassicTokenizerImpl.TOKEN_TYPES;
            return ClassicTokenizerImpl.TOKEN_TYPES = StandardTokenizer.TOKEN_TYPES;
        }
    }]);

    function ClassicTokenizerImpl(in$) {
        _classCallCheck(this, ClassicTokenizerImpl);

        this.zzReader = null;
        this.zzState = 0;
        this.zzLexicalState = ClassicTokenizerImpl.YYINITIAL;
        this.zzBuffer = new Array(ClassicTokenizerImpl.ZZ_BUFFERSIZE);
        this.zzMarkedPos = 0;
        this.zzCurrentPos = 0;
        this.zzStartRead = 0;
        this.zzEndRead = 0;
        this.yyline = 0;
        this.yychar = 0;
        this.yycolumn = 0;
        this.zzAtBOL = true;
        this.zzAtEOF = false;
        this.zzEOFDone = false;
        this.zzFinalHighSurrogate = 0;
        this.uuuuuuu = null;
        this.zzzzzzzzz = null;
        this.zzReader = in$;
        var x = 42;
    }

    _createClass(ClassicTokenizerImpl, [{
        key: 'zzRefill',
        value: function zzRefill() {
            if (this.zzStartRead > 0) {
                this.zzEndRead += this.zzFinalHighSurrogate;
                this.zzFinalHighSurrogate = 0;
                System.arraycopy(this.zzBuffer, this.zzStartRead, this.zzBuffer, 0, this.zzEndRead - this.zzStartRead);
                this.zzEndRead -= this.zzStartRead;
                this.zzCurrentPos -= this.zzStartRead;
                this.zzMarkedPos -= this.zzStartRead;
                this.zzStartRead = 0;
            }
            if (this.zzCurrentPos >= this.zzBuffer.length - this.zzFinalHighSurrogate) {
                var newBuffer = new Array(this.zzBuffer.length * 2);
                System.arraycopy(this.zzBuffer, 0, newBuffer, 0, this.zzBuffer.length);
                this.zzBuffer = newBuffer;
                this.zzEndRead += this.zzFinalHighSurrogate;
                this.zzFinalHighSurrogate = 0;
            }
            var requested = this.zzBuffer.length - this.zzEndRead;
            var totalRead = 0;
            while (totalRead < requested) {
                var numRead = this.zzReader.read(this.zzBuffer, this.zzEndRead + totalRead, requested - totalRead);
                if (numRead === -1) {
                    break;
                }
                totalRead += numRead;
            }
            if (totalRead > 0) {
                this.zzEndRead += totalRead;
                if (totalRead === requested) {
                    if (Character.isHighSurrogate(this.zzBuffer[this.zzEndRead - 1])) {
                        --this.zzEndRead;
                        this.zzFinalHighSurrogate = 1;
                    }
                }
                return false;
            }
            return true;
        }
    }, {
        key: 'yyclose',
        value: function yyclose() {
            this.zzAtEOF = true;
            this.zzEndRead = this.zzStartRead;
            if (this.zzReader !== null) this.zzReader.close();
        }
    }, {
        key: 'yyreset',
        value: function yyreset(reader) {
            this.zzReader = reader;
            this.zzAtBOL = true;
            this.zzAtEOF = false;
            this.zzEOFDone = false;
            this.zzEndRead = this.zzStartRead = 0;
            this.zzCurrentPos = this.zzMarkedPos = 0;
            this.zzFinalHighSurrogate = 0;
            this.yyline = this.yychar = this.yycolumn = 0;
            this.zzLexicalState = ClassicTokenizerImpl.YYINITIAL;
            if (this.zzBuffer.length > ClassicTokenizerImpl.ZZ_BUFFERSIZE) this.zzBuffer = new Array(ClassicTokenizerImpl.ZZ_BUFFERSIZE);
        }
    }, {
        key: 'yystate',
        value: function yystate() {
            return this.zzLexicalState;
        }
    }, {
        key: 'yybegin',
        value: function yybegin(newState) {
            this.zzLexicalState = newState;
        }
    }, {
        key: 'yytext',
        value: function yytext() {
            return new String(this.zzBuffer, this.zzStartRead, this.zzMarkedPos - this.zzStartRead);
        }
    }, {
        key: 'yycharat',
        value: function yycharat(pos) {
            return this.zzBuffer[this.zzStartRead + pos];
        }
    }, {
        key: 'yylength',
        value: function yylength() {
            return this.zzMarkedPos - this.zzStartRead;
        }
    }, {
        key: 'zzScanError',
        value: function zzScanError(errorCode) {
            var message = undefined;
            try {
                message = ClassicTokenizerImpl.ZZ_ERROR_MSG[errorCode];
            } catch (e) {
                if (e instanceof ArrayIndexOutOfBoundsException) {
                    message = ClassicTokenizerImpl.ZZ_ERROR_MSG[ClassicTokenizerImpl.ZZ_UNKNOWN_ERROR];
                } else throw e;
            }
            throw new Error(message);
        }
    }, {
        key: 'yypushback',
        value: function yypushback(number) {
            if (number > this.yylength()) this.zzScanError(ClassicTokenizerImpl.ZZ_PUSHBACK_2BIG);
            this.zzMarkedPos -= number;
        }
    }, {
        key: 'getNextToken',
        value: function getNextToken() {
            var zzInput = undefined;
            var zzAction = undefined;
            var zzCurrentPosL = undefined;
            var zzMarkedPosL = undefined;
            var zzEndReadL = this.zzEndRead;
            var zzBufferL = this.zzBuffer;
            var zzCMapL = ClassicTokenizerImpl.ZZ_CMAP;
            var zzTransL = ClassicTokenizerImpl.ZZ_TRANS;
            var zzRowMapL = ClassicTokenizerImpl.ZZ_ROWMAP;
            var zzAttrL = ClassicTokenizerImpl.ZZ_ATTRIBUTE;
            while (true) {
                zzMarkedPosL = this.zzMarkedPos;
                this.yychar += zzMarkedPosL - this.zzStartRead;
                zzAction = -1;
                zzCurrentPosL = this.zzCurrentPos = this.zzStartRead = zzMarkedPosL;
                this.zzState = ClassicTokenizerImpl.ZZ_LEXSTATE[this.zzLexicalState];
                var zzAttributes = zzAttrL[this.zzState];
                if ((zzAttributes & 1) === 1) {
                    zzAction = this.zzState;
                }
                zzForAction: {
                    while (true) {
                        if (zzCurrentPosL < zzEndReadL) {
                            zzInput = Character.codePointAt(zzBufferL, zzCurrentPosL, zzEndReadL);
                            zzCurrentPosL += Character.charCount(zzInput);
                        } else if (this.zzAtEOF) {
                            zzInput = ClassicTokenizerImpl.YYEOF;
                            break zzForAction;
                        } else {
                            this.zzCurrentPos = zzCurrentPosL;
                            this.zzMarkedPos = zzMarkedPosL;
                            var eof = this.zzRefill();
                            zzCurrentPosL = this.zzCurrentPos;
                            zzMarkedPosL = this.zzMarkedPos;
                            zzBufferL = this.zzBuffer;
                            zzEndReadL = this.zzEndRead;
                            if (eof) {
                                zzInput = ClassicTokenizerImpl.YYEOF;
                                break zzForAction;
                            } else {
                                zzInput = Character.codePointAt(zzBufferL, zzCurrentPosL, zzEndReadL);
                                zzCurrentPosL += Character.charCount(zzInput);
                            }
                        }
                        var zzNext = zzTransL[zzRowMapL[this.zzState] + zzCMapL[zzInput]];
                        if (zzNext === -1) break zzForAction;
                        this.zzState = zzNext;
                        zzAttributes = zzAttrL[this.zzState];
                        if ((zzAttributes & 1) === 1) {
                            zzAction = this.zzState;
                            zzMarkedPosL = zzCurrentPosL;
                            if ((zzAttributes & 8) === 8) break zzForAction;
                        }
                    }
                }
                this.zzMarkedPos = zzMarkedPosL;
                switch (zzAction < 0 ? zzAction : ClassicTokenizerImpl.ZZ_ACTION[zzAction]) {
                    case 1:
                        {
                            break;
                        }
                    case 11:
                        break;
                    case 2:
                        {
                            return ClassicTokenizerImpl.ALPHANUM;
                        }
                    case 12:
                        break;
                    case 3:
                        {
                            return ClassicTokenizerImpl.CJ;
                        }
                    case 13:
                        break;
                    case 4:
                        {
                            return ClassicTokenizerImpl.HOST;
                        }
                    case 14:
                        break;
                    case 5:
                        {
                            return ClassicTokenizerImpl.NUM;
                        }
                    case 15:
                        break;
                    case 6:
                        {
                            return ClassicTokenizerImpl.APOSTROPHE;
                        }
                    case 16:
                        break;
                    case 7:
                        {
                            return ClassicTokenizerImpl.COMPANY;
                        }
                    case 17:
                        break;
                    case 8:
                        {
                            return ClassicTokenizerImpl.ACRONYM_DEP;
                        }
                    case 18:
                        break;
                    case 9:
                        {
                            return ClassicTokenizerImpl.ACRONYM;
                        }
                    case 19:
                        break;
                    case 10:
                        {
                            return ClassicTokenizerImpl.EMAIL;
                        }
                    case 20:
                        break;
                    default:
                        if (zzInput === ClassicTokenizerImpl.YYEOF && this.zzStartRead === this.zzCurrentPos) {
                            this.zzAtEOF = true;
                            return ClassicTokenizerImpl.YYEOF;
                        } else {
                            this.zzScanError(ClassicTokenizerImpl.ZZ_NO_MATCH);
                        }
                }
            }
        }
    }, {
        key: 'ddd$0',
        value: function ddd$0() {}
    }, {
        key: 'ddd$1',
        value: function ddd$1(a) {}
    }], [{
        key: 'zzUnpackCMap',
        value: function zzUnpackCMap(packed) {
            var map = new Array(0x110000);
            var i = 0;
            var j = 0;
            while (i < 1170) {
                var count = packed.charCodeAt(i++);
                var value = packed.charCodeAt(i++);
                do map[j++] = value; while (--count > 0);
            }
            return map;
        }
    }, {
        key: 'dddstatic',
        value: function dddstatic(a) {}
    }, {
        key: 'overstatic$1',
        value: function overstatic$1(a) {}
    }, {
        key: 'overstatic$0',
        value: function overstatic$0() {}
    }, {
        key: 'zzUnpackAction$2',
        value: function zzUnpackAction$2(packed1, offset) {
            var i = 0;
            var j = offset;
            var l = packed1.charCodeAt(1);
            packed1.length;
            packed1.packed1.charAt(1);
            l.charAt();
            this.uuuuuuu.charCodeAt(42);
            packed.x.length();
            l = this.ddd$1(1).ff.ddd().length();
            this.ddd$0().length.charAt(42);
            l = ddd(4, 5).charAt(1);
            l = ["aaa"][0].length();
            while (i < l) {
                var count = packed.ZZ_ACTION.charAt(i++).ZZ_ACTION.i.a.ZZ_ACTION(ClassicTokenizerImpl.ZZ_ACTION);
                var count1 = packed.ZZ_ACTION.charAt(i++).i;
                var count3 = this.zzzzzzzzz.charCodeAt(i++).i;
                var count4 = this.zzzzzzzzz.zzzzzzzzz;
                var value = ClassicTokenizerImpl.ZZ_ACTION.packeddfdfdfd.charAt(i++);
                var _x = ClassicTokenizerImpl.ZZ_ACTION.packeddfdfdfd.ZZ_ACTION(c.i++);
                var f = ClassicTokenizerImpl.ZZ_ACTION[c.ZZ_ACTION].ZZ_ACTION[ClassicTokenizerImpl.ZZ_ACTION]++;
            }
            ClassicTokenizerImpl.uuuuuuustatic.charCodeAt(42);
            ClassicTokenizerImpl.uuuuuuustatic.charCodeAt(42);
            ClassicTokenizerImpl.ClassicTokenizerImpl.uuuuuuustatic.charAt(42);
            ClassicTokenizerImpl.uuuuuuustatic.x.charAt(42);
            ClassicTokenizerImpl.uuuuuuustatic.x.charAt(42);
            ClassicTokenizerImpl.zzzzzzzzzstatic.charCodeAt(42);
            ClassicTokenizerImpl.zzzzzzzzzstatic.charCodeAt(42);
            ClassicTokenizerImpl.zzzzzzzzzstatic.x.charAt(42);
            ClassicTokenizerImpl.zzzzzzzzzstatic.x.charAt(42);
            ClassicTokenizerImpl.dddstatic(1).ff.dddstatic().length();
            ClassicTokenizerImpl.dddstatic(42).length.charAt(42);
            ClassicTokenizerImpl.dddstatic().length().charAt(42);
            ClassicTokenizerImpl.uuuuuuustatic.uuuuuuustatic(42);
            ClassicTokenizerImpl.uuuuuuustatic.uuuuuuustatic(42);
            ClassicTokenizerImpl.uuuuuuustatic.ClassicTokenizerImpl.uuuuuuustatic(42);
            ClassicTokenizerImpl.uuuuuuustatic.x.uuuuuuustatic(42);
            ClassicTokenizerImpl.zzzzzzzzzstatic.dddstatic(42);
            ClassicTokenizerImpl.zzzzzzzzzstatic.dddstatic(42);
            ClassicTokenizerImpl.zzzzzzzzzstatic.x.dddstatic(42);
            ClassicTokenizerImpl.zzzzzzzzzstatic.dddstatic.uuuuuuustatic(42);
            ClassicTokenizerImpl.dddstatic(1).ff.dddstatic().charAt();
            ClassicTokenizerImpl.dddstatic(42).charCodeAt().ClassicTokenizerImpl(42).dddstatic();
            ClassicTokenizerImpl.dddstatic().length().charAt(42).dddstatic();
            ClassicTokenizerImpl.uuuuuuustatic.uuuuuuustatic(42);
            this.uuuuuuustatic.uuuuuuustatic(42);
            ClassicTokenizerImpl.uuuuuuustatic.x.uuuuuuustatic(42);
            this.uuuuuuustatic.x.uuuuuuustatic(42);
            ClassicTokenizerImpl.zzzzzzzzzstatic.dddstatic(42).length();
            this.zzzzzzzzzstatic.dddstatic(42).length();
            ClassicTokenizerImpl.zzzzzzzzzstatic.x.dddstatic(42).length();
            this.zzzzzzzzzstatic.dddstatic.uuuuuuustatic(42);
            ClassicTokenizerImpl.dddstatic(1).length.length();
            this.dddstatic(42).length.charAt(42).dddstatic();
            this.dddstatic().length().charAt(42).dddstatic();
            ClassicTokenizerImpl.overstatic$0().charCodeAt(42);
            ClassicTokenizerImpl.overstatic$1(42).length;
            this.aaaaaa = 0;
            this.zzzzzzzzzstatic = 0;
            return j;
        }
    }, {
        key: 'zzzzzzzzzstatic',
        get: function get() {
            delete ClassicTokenizerImpl.zzzzzzzzzstatic;
            return ClassicTokenizerImpl.zzzzzzzzzstatic = "hello";
        }
    }, {
        key: 'uuuuuuustatic',
        get: function get() {
            delete ClassicTokenizerImpl.uuuuuuustatic;
            return ClassicTokenizerImpl.uuuuuuustatic = null;
        },
        set: function set(value) {
            delete ClassicTokenizerImpl.uuuuuuustatic;
            ClassicTokenizerImpl.uuuuuuustatic = value;
        }
    }]);

    return ClassicTokenizerImpl;
})();

var Test = (function () {
    _createClass(Test, [{
        key: 'test_instanceof',
        value: function test_instanceof() {
            x instanceof ZZ_CMAP_PACKED;
            x instanceof rwggbdhdfhjukgjsdgfsagdhjdjh;
            if (Test.ZZ_CMAP_PACKED++) {}
            if (Test.ZZ_CMAP_PACKED instanceof ZZ_CMAP_PACKED) {}
            Test.ZZ_CMAP_PACKED = 42;
            var ZZ_CMAP_PACKED = 0;
            ZZ_CMAP_PACKED = 42;
        }
    }, {
        key: 'testyychar$fixed',
        value: function testyychar$fixed() {
            return this.testyychar;
        }
    }, {
        key: 'testyycharover$0',
        value: function testyycharover$0() {
            return this.testyycharover;
        }
    }, {
        key: 'testyycharover$1',
        value: function testyycharover$1(x) {
            return this.testyycharover;
        }
    }, {
        key: 'test_abstract',
        value: function test_abstract() {
            throw 'NotImpl < test_abstract >';
        }
    }], [{
        key: 'kewords_scope',
        value: function kewords_scope(x, var$) {
            var in$ = 42;
            x += var$++;
            in$++;
            in$[in$++] = 42;
            test(in$[in$++], in$, var$);
        }
    }, {
        key: 'test_scope',
        value: function test_scope() {
            Test.ZZ_CMAP_PACKED = 42;
            var ZZ_CMAP_PACKED = 0;
            ZZ_CMAP_PACKED = 42;
        }
    }, {
        key: 'test_params_scope',
        value: function test_params_scope(ZZ_CMAP_PACKED, x) {
            ZZ_CMAP_PACKED = 42;
            ZZ_CMAP_PACKED.charAt();
            x.charCodeAt();
        }
    }, {
        key: 'test_while_scope',
        value: function test_while_scope() {
            while (true) {
                Test.ZZ_CMAP_PACKED = 42;
                var _ZZ_CMAP_PACKED = 0;
                _ZZ_CMAP_PACKED = 42;
            }
            Test.ZZ_CMAP_PACKED = 42;
        }
    }, {
        key: 'test_catch_scope',
        value: function test_catch_scope() {
            Test.ZZ_CMAP_PACKED = 42;
            try {
                Test.ZZ_CMAP_PACKED = 42;
                var _ZZ_CMAP_PACKED2 = 0;
                _ZZ_CMAP_PACKED2 = 42;
            } catch (var$) {
                if (var$ instanceof String) {
                    var _x2 = var$;
                    Test.ZZ_CMAP_PACKED.charAt();
                    _x2.charCodeAt();
                } else if (var$ instanceof Ex) {
                    Test.ZZ_CMAP_PACKED = 42;
                    var _ZZ_CMAP_PACKED3 = 0;
                    _ZZ_CMAP_PACKED3 = 42;
                    var$++;
                } else throw var$;
            }
            Test.ZZ_CMAP_PACKED = 42;
            try {
                Test.ZZ_CMAP_PACKED = 42;
            } catch (ZZ_CMAP_PACKED) {
                if (ZZ_CMAP_PACKED instanceof aaa) {
                    _ZZ_CMAP_PACKED4 = 42;
                    var _ZZ_CMAP_PACKED4 = 0;
                    _ZZ_CMAP_PACKED4 = 42;
                } else throw ZZ_CMAP_PACKED;
            }
            Test.ZZ_CMAP_PACKED = 42;
            try {
                Test.ZZ_CMAP_PACKED = 42;
            } catch (ex) {
                if (ex instanceof ZZ_CMAP_PACKED) {
                    Test.ZZ_CMAP_PACKED = 42;
                    var _ZZ_CMAP_PACKED5 = 0;
                    _ZZ_CMAP_PACKED5 = 42;
                } else throw ex;
            }
            Test.ZZ_CMAP_PACKED = 42;
            var ZZ_CMAP_PACKED = 0;
            ZZ_CMAP_PACKED = 42;
        }
    }, {
        key: 'test_for_scope',
        value: function test_for_scope() {
            Test.ZZ_CMAP_PACKED = 42;
            ;
            for (; x < 1; x++) {
                Test.ZZ_CMAP_PACKED = 42;
                var _ZZ_CMAP_PACKED6 = 0;
                _ZZ_CMAP_PACKED6 = 42;
            }
            Test.ZZ_CMAP_PACKED = 42;
            for (var ZZ_CMAP_PACKED = 1; x;) {
                _ZZ_CMAP_PACKED7 = 42;
                var _ZZ_CMAP_PACKED7 = 0;
                _ZZ_CMAP_PACKED7 = 42;
            }
            for (var _x3 = "hello"; _x3;) {
                _x3.charCodeAt();
            }
            Test.ZZ_CMAP_PACKED = 42;
            for (var _ZZ_CMAP_PACKED8 = 1; _ZZ_CMAP_PACKED8 < 1; _ZZ_CMAP_PACKED8++) {
                _ZZ_CMAP_PACKED8 = 42;
            }
            for (var _x4 = YYEOF, var$ = 42; var$ > 0 && _x4 < 1; _x4++, var$++) {}
            Test.ZZ_CMAP_PACKED = 42;
            var ZZ_CMAP_PACKED = 0;
            ZZ_CMAP_PACKED = 42;
        }
    }, {
        key: 'ZZ_CMAP_PACKED',
        get: function get() {
            delete Test.ZZ_CMAP_PACKED;
            return Test.ZZ_CMAP_PACKED = 0;
        },
        set: function set(value) {
            delete Test.ZZ_CMAP_PACKED;
            Test.ZZ_CMAP_PACKED = value;
        }
    }, {
        key: 'static_double_init_test',
        get: function get() {
            delete Test.static_double_init_test;
            return Test.static_double_init_test = 0.0;
        },
        set: function set(value) {
            delete Test.static_double_init_test;
            Test.static_double_init_test = value;
        }
    }, {
        key: 'static_float_init_test',
        get: function get() {
            delete Test.static_float_init_test;
            return Test.static_float_init_test = 0.0;
        },
        set: function set(value) {
            delete Test.static_float_init_test;
            Test.static_float_init_test = value;
        }
    }, {
        key: 'static_char_init_test',
        get: function get() {
            delete Test.static_char_init_test;
            return Test.static_char_init_test = '\u0000';
        },
        set: function set(value) {
            delete Test.static_char_init_test;
            Test.static_char_init_test = value;
        }
    }, {
        key: 'static_string_init_test',
        get: function get() {
            delete Test.static_string_init_test;
            return Test.static_string_init_test = null;
        },
        set: function set(value) {
            delete Test.static_string_init_test;
            Test.static_string_init_test = value;
        }
    }, {
        key: 'static_boolean_init_test',
        get: function get() {
            delete Test.static_boolean_init_test;
            return Test.static_boolean_init_test = false;
        },
        set: function set(value) {
            delete Test.static_boolean_init_test;
            Test.static_boolean_init_test = value;
        }
    }, {
        key: 'static_int_init_test',
        get: function get() {
            delete Test.static_int_init_test;
            return Test.static_int_init_test = 0;
        },
        set: function set(value) {
            delete Test.static_int_init_test;
            Test.static_int_init_test = value;
        }
    }, {
        key: 'static_short_init_test',
        get: function get() {
            delete Test.static_short_init_test;
            return Test.static_short_init_test = 0;
        },
        set: function set(value) {
            delete Test.static_short_init_test;
            Test.static_short_init_test = value;
        }
    }, {
        key: 'static_long_init_test',
        get: function get() {
            delete Test.static_long_init_test;
            return Test.static_long_init_test = 0;
        },
        set: function set(value) {
            delete Test.static_long_init_test;
            Test.static_long_init_test = value;
        }
    }]);

    function Test() {
        _classCallCheck(this, Test);

        this.double_init_test = 0.0;
        this.float_init_test = 0.0;
        this.char_init_test = '\u0000';
        this.string_init_test = null;
        this.boolean_init_test = false;
        this.int_init_test = 0;
        this.short_init_test = 0;
        this.long_init_test = 0;
        this.testyychar = 0;
        this.testyycharover = 0;
    }

    return Test;
})();

var TestInterface = (function () {
    function TestInterface() {
        _classCallCheck(this, TestInterface);
    }

    _createClass(TestInterface, [{
        key: 'test',
        value: function test() {
            throw 'NotImpl < test >';
        }
    }]);

    return TestInterface;
})();

var TestInterfaceClass = (function (_TestInterface) {
    _inherits(TestInterfaceClass, _TestInterface);

    function TestInterfaceClass() {
        _classCallCheck(this, TestInterfaceClass);

        _get(Object.getPrototypeOf(TestInterfaceClass.prototype), 'constructor', this).apply(this, arguments);
    }

    return TestInterfaceClass;
})(TestInterface);

var TestExtendsClass = (function (_TestInterface2) {
    _inherits(TestExtendsClass, _TestInterface2);

    function TestExtendsClass() {
        _classCallCheck(this, TestExtendsClass);

        _get(Object.getPrototypeOf(TestExtendsClass.prototype), 'constructor', this).apply(this, arguments);
    }

    return TestExtendsClass;
})(TestInterface);

var NumberExtendsClass = (function (_TestInterface3) {
    _inherits(NumberExtendsClass, _TestInterface3);

    function NumberExtendsClass() {
        _classCallCheck(this, NumberExtendsClass);

        _get(Object.getPrototypeOf(NumberExtendsClass.prototype), 'constructor', this).call(this);
        this.x = 42;
        this.y = 11;
        this.z = 42;
        this.k = 0xa5;
        this.d1 = 0.0;
        this.d2 = 34324.34;
        this.d3 = 1.2e34;
        this.f1 = 2.34E+22;
        this.f2 = 1.0;
        this.f3 = 0.0;
        this.d11 = -0.0;
        this.d22 = -34324.34;
        this.d33 = -1.2e34;
        this.f11 = -2.34E+22;
        this.f22 = -1.0;
        this.f33 = -0.0;
        this.x1 = -42;
        this.y1 = -11;
        this.z1 = -42;
        this.k1 = -0xa5;
        this.x2 = +42;
        this.y2 = +11;
        this.z2 = +42;
        this.k2 = +0xa5;
        this.t1 = 0xDFFF;
        this.t2 = 0xDFFF;
        this.t3 = 0xDFFd;
        this.t4 = 0xDFFD;
    }

    return NumberExtendsClass;
})(TestInterface);

var Animal = (function () {
    function Animal(name) {
        _classCallCheck(this, Animal);

        this.name = null;
        this.name = name;
    }

    _createClass(Animal, [{
        key: 'move$1',
        value: function move$1(meters) {
            Animal.MessageBox(this.name + ' #moved ' + meters + "m.");
        }
    }, {
        key: 'move$0',
        value: function move$0() {
            throw 'NotImpl < move$0 >';
        }
    }], [{
        key: 'MessageBox',
        value: function MessageBox(msg) {
            alert(msg);
        }
    }, {
        key: 'U_YIN_YANG',
        get: function get() {
            return '☯';
        }
    }, {
        key: 'U_CAUTION_SIGN',
        get: function get() {
            return '☡';
        }
    }, {
        key: 'test_octal',
        get: function get() {
            return '#';
        }
    }, {
        key: 'test_octal1',
        get: function get() {
            return '\u0000';
        }
    }, {
        key: 'test_not_final',
        get: function get() {
            delete Animal.test_not_final;
            return Animal.test_not_final = 'a';
        },
        set: function set(value) {
            delete Animal.test_not_final;
            Animal.test_not_final = value;
        }
    }, {
        key: 'test_not_final1',
        get: function get() {
            delete Animal.test_not_final1;
            return Animal.test_not_final1 = '\u0000';
        },
        set: function set(value) {
            delete Animal.test_not_final1;
            Animal.test_not_final1 = value;
        }
    }, {
        key: 'test_not_final_not_literal',
        get: function get() {
            delete Animal.test_not_final_not_literal;
            return Animal.test_not_final_not_literal = null;
        },
        set: function set(value) {
            delete Animal.test_not_final_not_literal;
            Animal.test_not_final_not_literal = value;
        }
    }]);

    return Animal;
})();

var Snake = (function (_Animal) {
    _inherits(Snake, _Animal);

    function Snake(name) {
        _classCallCheck(this, Snake);

        _get(Object.getPrototypeOf(Snake.prototype), 'constructor', this).call(this, name);
    }

    _createClass(Snake, [{
        key: 'move$0',
        value: function move$0() {
            Animal.MessageBox("Slithering...");
            _get(Object.getPrototypeOf(Snake.prototype), 'move$1', this).call(this, 3);
        }
    }]);

    return Snake;
})(Animal);

var Horse = (function (_Animal2) {
    _inherits(Horse, _Animal2);

    function Horse(name) {
        _classCallCheck(this, Horse);

        _get(Object.getPrototypeOf(Horse.prototype), 'constructor', this).call(this, name);
    }

    _createClass(Horse, [{
        key: 'move$0',
        value: function move$0() {
            Horse.MessageBox("Galloping...");
            _get(Object.getPrototypeOf(Horse.prototype), 'move$1', this).call(this, -0x2a);
        }
    }]);

    return Horse;
})(Animal);

var BabelEvaluate = (function () {
    function BabelEvaluate() {
        _classCallCheck(this, BabelEvaluate);
    }

    _createClass(BabelEvaluate, null, [{
        key: 'main',
        value: function main(args) {
            var animals = [new Snake(Animal.U_CAUTION_SIGN + 'Sammy the Python\u0001Z\n䌡'), new Horse(Animal.U_YIN_YANG + "Tommy the Palomino")];
            for (var i = 0; i < animals.length; i++) {
                animals[i].move$0();
            }
        }
    }]);

    return BabelEvaluate;
})();

