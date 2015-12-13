'use strict';
import 'java.io.IOException';
import 'org.apache.lucene.analysis.Tokenizer';
import 'org.apache.lucene.analysis.tokenattributes.CharTermAttribute';
import 'org.apache.lucene.analysis.tokenattributes.OffsetAttribute';
import 'org.apache.lucene.analysis.tokenattributes.PositionIncrementAttribute';
import 'org.apache.lucene.analysis.tokenattributes.TypeAttribute';
import 'org.apache.lucene.util.AttributeFactory';
import 'java.io.Reader';
class StandardTokenizer extends Tokenizer {
    static get ALPHANUM() {
        return 0;
    }
    static get APOSTROPHE() {
        return 1;
    }
    static get ACRONYM() {
        return 2;
    }
    static get COMPANY() {
        return 3;
    }
    static get EMAIL() {
        return 4;
    }
    static get HOST() {
        return 5;
    }
    static get NUM() {
        return 6;
    }
    static get CJ() {
        return 7;
    }
    static get ACRONYM_DEP() {
        return 8;
    }
    static get SOUTHEAST_ASIAN() {
        return 9;
    }
    static get IDEOGRAPHIC() {
        return 10;
    }
    static get HIRAGANA() {
        return 11;
    }
    static get KATAKANA() {
        return 12;
    }
    static get HANGUL() {
        return 13;
    }
    static get TOKEN_TYPES() {
        delete StandardTokenizer.TOKEN_TYPES;
        return StandardTokenizer.TOKEN_TYPES = [
            "<ALPHANUM>",
            "<APOSTROPHE>",
            "<ACRONYM>",
            "<COMPANY>",
            "<EMAIL>",
            "<HOST>",
            "<NUM>",
            "<CJ>",
            "<ACRONYM_DEP>",
            "<SOUTHEAST_ASIAN>",
            "<IDEOGRAPHIC>",
            "<HIRAGANA>",
            "<KATAKANA>",
            "<HANGUL>"
        ];
    }
    static get MAX_TOKEN_LENGTH_LIMIT() {
        return 1024 * 1024;
    }
    constructor() {
        super();
        this.scanner = null;
    }
}
class ClassicTokenizerImpl {
    static get YYEOF() {
        return -1;
    }
    static get ZZ_BUFFERSIZE() {
        return 4096;
    }
    static get YYINITIAL() {
        return 0;
    }
    static get ZZ_LEXSTATE() {
        delete ClassicTokenizerImpl.ZZ_LEXSTATE;
        return ClassicTokenizerImpl.ZZ_LEXSTATE = [
            0,
            0
        ];
    }
    static get ZZ_CMAP_PACKED() {
        return "\u0026\0\u0001\u0005\u0001\u0003\u0004\0\u0001\u0009\u0001\u0007\u0001\u0004\u0001\u0009\u000a\u0002\u0006\0" + "\u0001\u0006\u001a\u000a\u0004\0\u0001\u0008\u0001\0\u001a\u000a\u002f\0\u0001\u000a\u000a\0\u0001\u000a" + "\u0004\0\u0001\u000a\u0005\0\u0017\u000a\u0001\0\u001f\u000a\u0001\0\u0128\u000a\u0002\0\u0012\u000a" + "\u001c\0\u005e\u000a\u0002\0\u0009\u000a\u0002\0\u0007\u000a\u000e\0\u0002\u000a\u000e\0\u0005\u000a" + "\u0009\0\u0001\u000a\u008b\0\u0001\u000a\u000b\0\u0001\u000a\u0001\0\u0003\u000a\u0001\0\u0001\u000a" + "\u0001\0\u0014\u000a\u0001\0\u002c\u000a\u0001\0\u0008\u000a\u0002\0\u001a\u000a\u000c\0\u0082\u000a" + "\u000a\0\u0039\u000a\u0002\0\u0002\u000a\u0002\0\u0002\u000a\u0003\0\u0026\u000a\u0002\0\u0002\u000a" + "\u0037\0\u0026\u000a\u0002\0\u0001\u000a\u0007\0\u0027\u000a\u0048\0\u001b\u000a\u0005\0\u0003\u000a" + "\u002e\0\u001a\u000a\u0005\0\u000b\u000a\u0015\0\u000a\u0002\u0007\0\u0063\u000a\u0001\0\u0001\u000a" + "\u000f\0\u0002\u000a\u0009\0\u000a\u0002\u0003\u000a\u0013\0\u0001\u000a\u0001\0\u001b\u000a\u0053\0" + "\u0026\u000a\u015f\0\u0035\u000a\u0003\0\u0001\u000a\u0012\0\u0001\u000a\u0007\0\u000a\u000a\u0004\0" + "\u000a\u0002\u0015\0\u0008\u000a\u0002\0\u0002\u000a\u0002\0\u0016\u000a\u0001\0\u0007\u000a\u0001\0" + "\u0001\u000a\u0003\0\u0004\u000a\u0022\0\u0002\u000a\u0001\0\u0003\u000a\u0004\0\u000a\u0002\u0002\u000a" + "\u0013\0\u0006\u000a\u0004\0\u0002\u000a\u0002\0\u0016\u000a\u0001\0\u0007\u000a\u0001\0\u0002\u000a" + "\u0001\0\u0002\u000a\u0001\0\u0002\u000a\u001f\0\u0004\u000a\u0001\0\u0001\u000a\u0007\0\u000a\u0002" + "\u0002\0\u0003\u000a\u0010\0\u0007\u000a\u0001\0\u0001\u000a\u0001\0\u0003\u000a\u0001\0\u0016\u000a" + "\u0001\0\u0007\u000a\u0001\0\u0002\u000a\u0001\0\u0005\u000a\u0003\0\u0001\u000a\u0012\0\u0001\u000a" + "\u000f\0\u0001\u000a\u0005\0\u000a\u0002\u0015\0\u0008\u000a\u0002\0\u0002\u000a\u0002\0\u0016\u000a" + "\u0001\0\u0007\u000a\u0001\0\u0002\u000a\u0002\0\u0004\u000a\u0003\0\u0001\u000a\u001e\0\u0002\u000a" + "\u0001\0\u0003\u000a\u0004\0\u000a\u0002\u0015\0\u0006\u000a\u0003\0\u0003\u000a\u0001\0\u0004\u000a" + "\u0003\0\u0002\u000a\u0001\0\u0001\u000a\u0001\0\u0002\u000a\u0003\0\u0002\u000a\u0003\0\u0003\u000a" + "\u0003\0\u0008\u000a\u0001\0\u0003\u000a\u002d\0\u0009\u0002\u0015\0\u0008\u000a\u0001\0\u0003\u000a" + "\u0001\0\u0017\u000a\u0001\0\u000a\u000a\u0001\0\u0005\u000a\u0026\0\u0002\u000a\u0004\0\u000a\u0002" + "\u0015\0\u0008\u000a\u0001\0\u0003\u000a\u0001\0\u0017\u000a\u0001\0\u000a\u000a\u0001\0\u0005\u000a" + "\u0024\0\u0001\u000a\u0001\0\u0002\u000a\u0004\0\u000a\u0002\u0015\0\u0008\u000a\u0001\0\u0003\u000a" + "\u0001\0\u0017\u000a\u0001\0\u0010\u000a\u0026\0\u0002\u000a\u0004\0\u000a\u0002\u0015\0\u0012\u000a" + "\u0003\0\u0018\u000a\u0001\0\u0009\u000a\u0001\0\u0001\u000a\u0002\0\u0007\u000a\u0039\0\u0001\u0001" + "\u0030\u000a\u0001\u0001\u0002\u000a\u000c\u0001\u0007\u000a\u0009\u0001\u000a\u0002\u0027\0\u0002\u000a\u0001\0" + "\u0001\u000a\u0002\0\u0002\u000a\u0001\0\u0001\u000a\u0002\0\u0001\u000a\u0006\0\u0004\u000a\u0001\0" + "\u0007\u000a\u0001\0\u0003\u000a\u0001\0\u0001\u000a\u0001\0\u0001\u000a\u0002\0\u0002\u000a\u0001\0" + "\u0004\u000a\u0001\0\u0002\u000a\u0009\0\u0001\u000a\u0002\0\u0005\u000a\u0001\0\u0001\u000a\u0009\0" + "\u000a\u0002\u0002\0\u0002\u000a\u0022\0\u0001\u000a\u001f\0\u000a\u0002\u0016\0\u0008\u000a\u0001\0" + "\u0022\u000a\u001d\0\u0004\u000a\u0074\0\u0022\u000a\u0001\0\u0005\u000a\u0001\0\u0002\u000a\u0015\0" + "\u000a\u0002\u0006\0\u0006\u000a\u004a\0\u0026\u000a\u000a\0\u0027\u000a\u0009\0\u005a\u000a\u0005\0" + "\u0044\u000a\u0005\0\u0052\u000a\u0006\0\u0007\u000a\u0001\0\u003f\u000a\u0001\0\u0001\u000a\u0001\0" + "\u0004\u000a\u0002\0\u0007\u000a\u0001\0\u0001\u000a\u0001\0\u0004\u000a\u0002\0\u0027\u000a\u0001\0" + "\u0001\u000a\u0001\0\u0004\u000a\u0002\0\u001f\u000a\u0001\0\u0001\u000a\u0001\0\u0004\u000a\u0002\0" + "\u0007\u000a\u0001\0\u0001\u000a\u0001\0\u0004\u000a\u0002\0\u0007\u000a\u0001\0\u0007\u000a\u0001\0" + "\u0017\u000a\u0001\0\u001f\u000a\u0001\0\u0001\u000a\u0001\0\u0004\u000a\u0002\0\u0007\u000a\u0001\0" + "\u0027\u000a\u0001\0\u0013\u000a\u000e\0\u0009\u0002\u002e\0\u0055\u000a\u000c\0\u026c\u000a\u0002\0" + "\u0008\u000a\u000a\0\u001a\u000a\u0005\0\u004b\u000a\u0095\0\u0034\u000a\u002c\0\u000a\u0002\u0026\0" + "\u000a\u0002\u0006\0\u0058\u000a\u0008\0\u0029\u000a\u0557\0\u009c\u000a\u0004\0\u005a\u000a\u0006\0" + "\u0016\u000a\u0002\0\u0006\u000a\u0002\0\u0026\u000a\u0002\0\u0006\u000a\u0002\0\u0008\u000a\u0001\0" + "\u0001\u000a\u0001\0\u0001\u000a\u0001\0\u0001\u000a\u0001\0\u001f\u000a\u0002\0\u0035\u000a\u0001\0" + "\u0007\u000a\u0001\0\u0001\u000a\u0003\0\u0003\u000a\u0001\0\u0007\u000a\u0003\0\u0004\u000a\u0002\0" + "\u0006\u000a\u0004\0\u000d\u000a\u0005\0\u0003\u000a\u0001\0\u0007\u000a\u0082\0\u0001\u000a\u0082\0" + "\u0001\u000a\u0004\0\u0001\u000a\u0002\0\u000a\u000a\u0001\0\u0001\u000a\u0003\0\u0005\u000a\u0006\0" + "\u0001\u000a\u0001\0\u0001\u000a\u0001\0\u0001\u000a\u0001\0\u0004\u000a\u0001\0\u0003\u000a\u0001\0" + "\u0007\u000a\u0ecb\0\u0002\u000a\u002a\0\u0005\u000a\u000a\0\u0001\u000b\u0054\u000b\u0008\u000b\u0002\u000b" + "\u0002\u000b\u005a\u000b\u0001\u000b\u0003\u000b\u0006\u000b\u0028\u000b\u0003\u000b\u0001\0\u005e\u000a\u0011\0" + "\u0018\u000a\u0038\0\u0010\u000b\u0100\0\u0080\u000b\u0080\0\u19b6\u000b\u000a\u000b\u0040\0\u51a6\u000b" + "\u005a\u000b\u048d\u000a\u0773\0\u2ba4\u000a\u215c\0\u012e\u000b\u00d2\u000b\u0007\u000a\u000c\0\u0005\u000a" + "\u0005\0\u0001\u000a\u0001\0\u000a\u000a\u0001\0\u000d\u000a\u0001\0\u0005\u000a\u0001\0\u0001\u000a" + "\u0001\0\u0002\u000a\u0001\0\u0002\u000a\u0001\0\u006c\u000a\u0021\0\u016b\u000a\u0012\0\u0040\u000a" + "\u0002\0\u0036\u000a\u0028\0\u000c\u000a\u0074\0\u0003\u000a\u0001\0\u0001\u000a\u0001\0\u0087\u000a" + "\u0013\0\u000a\u0002\u0007\0\u001a\u000a\u0006\0\u001a\u000a\u000a\0\u0001\u000b\u003a\u000b\u001f\u000a" + "\u0003\0\u0006\u000a\u0002\0\u0006\u000a\u0002\0\u0006\u000a\u0002\0\u0003\u000a\uffff\0\uffff\0\uffff\0\uffff\0\uffff\0\uffff\0\uffff\0\uffff\0\uffff\0\uffff\0\uffff\0\uffff\0\uffff\0\uffff\0\uffff\0\uffff\0\u0033\0";
    }
    static get ZZ_CMAP() {
        delete ClassicTokenizerImpl.ZZ_CMAP;
        return ClassicTokenizerImpl.ZZ_CMAP = ClassicTokenizerImpl.zzUnpackCMap(ClassicTokenizerImpl.ZZ_CMAP_PACKED);
    }
    static get ZZ_ACTION() {
        delete ClassicTokenizerImpl.ZZ_ACTION;
        return ClassicTokenizerImpl.ZZ_ACTION = ClassicTokenizerImpl.zzUnpackAction$0();
    }
    static get ZZ_ACTION_PACKED_0() {
        return "\u0001\0\u0001\u0001\u0003\u0002\u0001\u0003\u000b\0\u0001\u0002\u0003\u0004\u0002\0" + "\u0001\u0005\u0001\0\u0001\u0005\u0003\u0004\u0006\u0005\u0001\u0006\u0001\u0004\u0002\u0007" + "\u0001\u0008\u0001\0\u0001\u0008\u0003\0\u0002\u0008\u0001\u0009\u0001\u000a\u0001\u0004";
    }
    static zzUnpackAction$0() {
        let result = new Array(50);
        let offset = 0;
        offset = ClassicTokenizerImpl.zzUnpackAction$3(ClassicTokenizerImpl.ZZ_ACTION_PACKED_0, offset, result);
        return result;
    }
    static zzUnpackAction$3(packed, offset, result) {
        let i = 0;
        let j = offset;
        let l = packed.length;
        while (i < l) {
            let count = packed.charCodeAt(i++);
            let value = packed.charCodeAt(i++);
            do
                result[j++] = value;
            while (--count > 0);
        }
        return j;
    }
    static get ZZ_ROWMAP() {
        delete ClassicTokenizerImpl.ZZ_ROWMAP;
        return ClassicTokenizerImpl.ZZ_ROWMAP = ClassicTokenizerImpl.zzUnpackRowMap$0();
    }
    static get ZZ_ROWMAP_PACKED_0() {
        return "\0\0\0\u000c\0\u0018\0\u0024\0\u0030\0\u000c\0\u003c\0\u0048" + "\0\u0054\0\u0060\0\u006c\0\u0078\0\u0084\0\u0090\0\u009c\0\u00a8" + "\0\u00b4\0\u00c0\0\u00cc\0\u00d8\0\u00e4\0\u00f0\0\u00fc\0\u0108" + "\0\u0114\0\u0120\0\u012c\0\u0138\0\u0144\0\u0150\0\u015c\0\u0168" + "\0\u0174\0\u0180\0\u018c\0\u0198\0\u01a4\0\u00a8\0\u01b0\0\u01bc" + "\0\u01c8\0\u01d4\0\u01e0\0\u01ec\0\u01f8\0\u003c\0\u006c\0\u0204" + "\0\u0210\0\u021c";
    }
    static zzUnpackRowMap$0() {
        let result = new Array(50);
        let offset = 0;
        offset = ClassicTokenizerImpl.zzUnpackRowMap$3(ClassicTokenizerImpl.ZZ_ROWMAP_PACKED_0, offset, result);
        return result;
    }
    static zzUnpackRowMap$3(packed, offset, result) {
        let i = 0;
        let j = offset;
        let l = packed.length;
        while (i < l) {
            let high = packed.charCodeAt(i++) << 16;
            result[j++] = high | packed.charCodeAt(i++);
        }
        return j;
    }
    static get ZZ_TRANS() {
        delete ClassicTokenizerImpl.ZZ_TRANS;
        return ClassicTokenizerImpl.ZZ_TRANS = ClassicTokenizerImpl.zzUnpackTrans$0();
    }
    static get ZZ_TRANS_PACKED_0() {
        return "\u0001\u0002\u0001\u0003\u0001\u0004\u0007\u0002\u0001\u0005\u0001\u0006\u000d\0\u0002\u0003" + "\u0001\0\u0001\u0007\u0001\0\u0001\u0008\u0002\u0009\u0001\u000a\u0001\u0003\u0002\0" + "\u0001\u0003\u0001\u0004\u0001\0\u0001\u000b\u0001\0\u0001\u0008\u0002\u000c\u0001\u000d" + "\u0001\u0004\u0002\0\u0001\u0003\u0001\u0004\u0001\u000e\u0001\u000f\u0001\u0010\u0001\u0011" + "\u0002\u0009\u0001\u000a\u0001\u0012\u0002\0\u0001\u0013\u0001\u0014\u0007\0\u0001\u0015" + "\u0002\0\u0002\u0016\u0007\0\u0001\u0016\u0002\0\u0001\u0017\u0001\u0018\u0007\0" + "\u0001\u0019\u0003\0\u0001\u001a\u0007\0\u0001\u000a\u0002\0\u0001\u001b\u0001\u001c" + "\u0007\0\u0001\u001d\u0002\0\u0001\u001e\u0001\u001f\u0007\0\u0001\u0020\u0002\0" + "\u0001\u0021\u0001\u0022\u0007\0\u0001\u0023\u000b\0\u0001\u0024\u0002\0\u0001\u0013" + "\u0001\u0014\u0007\0\u0001\u0025\u000b\0\u0001\u0026\u0002\0\u0002\u0016\u0007\0" + "\u0001\u0027\u0002\0\u0001\u0003\u0001\u0004\u0001\u000e\u0001\u0007\u0001\u0010\u0001\u0011" + "\u0002\u0009\u0001\u000a\u0001\u0012\u0002\0\u0002\u0013\u0001\0\u0001\u0028\u0001\0" + "\u0001\u0008\u0002\u0029\u0001\0\u0001\u0013\u0002\0\u0001\u0013\u0001\u0014\u0001\0" + "\u0001\u002a\u0001\0\u0001\u0008\u0002\u002b\u0001\u002c\u0001\u0014\u0002\0\u0001\u0013" + "\u0001\u0014\u0001\0\u0001\u0028\u0001\0\u0001\u0008\u0002\u0029\u0001\0\u0001\u0015" + "\u0002\0\u0002\u0016\u0001\0\u0001\u002d\u0002\0\u0001\u002d\u0002\0\u0001\u0016" + "\u0002\0\u0002\u0017\u0001\0\u0001\u0029\u0001\0\u0001\u0008\u0002\u0029\u0001\0" + "\u0001\u0017\u0002\0\u0001\u0017\u0001\u0018\u0001\0\u0001\u002b\u0001\0\u0001\u0008" + "\u0002\u002b\u0001\u002c\u0001\u0018\u0002\0\u0001\u0017\u0001\u0018\u0001\0\u0001\u0029" + "\u0001\0\u0001\u0008\u0002\u0029\u0001\0\u0001\u0019\u0003\0\u0001\u001a\u0001\0" + "\u0001\u002c\u0002\0\u0003\u002c\u0001\u001a\u0002\0\u0002\u001b\u0001\0\u0001\u002e" + "\u0001\0\u0001\u0008\u0002\u0009\u0001\u000a\u0001\u001b\u0002\0\u0001\u001b\u0001\u001c" + "\u0001\0\u0001\u002f\u0001\0\u0001\u0008\u0002\u000c\u0001\u000d\u0001\u001c\u0002\0" + "\u0001\u001b\u0001\u001c\u0001\0\u0001\u002e\u0001\0\u0001\u0008\u0002\u0009\u0001\u000a" + "\u0001\u001d\u0002\0\u0002\u001e\u0001\0\u0001\u0009\u0001\0\u0001\u0008\u0002\u0009" + "\u0001\u000a\u0001\u001e\u0002\0\u0001\u001e\u0001\u001f\u0001\0\u0001\u000c\u0001\0" + "\u0001\u0008\u0002\u000c\u0001\u000d\u0001\u001f\u0002\0\u0001\u001e\u0001\u001f\u0001\0" + "\u0001\u0009\u0001\0\u0001\u0008\u0002\u0009\u0001\u000a\u0001\u0020\u0002\0\u0002\u0021" + "\u0001\0\u0001\u000a\u0002\0\u0003\u000a\u0001\u0021\u0002\0\u0001\u0021\u0001\u0022" + "\u0001\0\u0001\u000d\u0002\0\u0003\u000d\u0001\u0022\u0002\0\u0001\u0021\u0001\u0022" + "\u0001\0\u0001\u000a\u0002\0\u0003\u000a\u0001\u0023\u0004\0\u0001\u000e\u0006\0" + "\u0001\u0024\u0002\0\u0001\u0013\u0001\u0014\u0001\0\u0001\u0030\u0001\0\u0001\u0008" + "\u0002\u0029\u0001\0\u0001\u0015\u0002\0\u0002\u0016\u0001\0\u0001\u002d\u0002\0" + "\u0001\u002d\u0002\0\u0001\u0027\u0002\0\u0002\u0013\u0007\0\u0001\u0013\u0002\0" + "\u0002\u0017\u0007\0\u0001\u0017\u0002\0\u0002\u001b\u0007\0\u0001\u001b\u0002\0" + "\u0002\u001e\u0007\0\u0001\u001e\u0002\0\u0002\u0021\u0007\0\u0001\u0021\u0002\0" + "\u0002\u0031\u0007\0\u0001\u0031\u0002\0\u0002\u0013\u0007\0\u0001\u0032\u0002\0" + "\u0002\u0031\u0001\0\u0001\u002d\u0002\0\u0001\u002d\u0002\0\u0001\u0031\u0002\0" + "\u0002\u0013\u0001\0\u0001\u0030\u0001\0\u0001\u0008\u0002\u0029\u0001\0\u0001\u0013" + "\u0001\0";
    }
    static zzUnpackTrans$0() {
        let result = new Array(552);
        let offset = 0;
        offset = ClassicTokenizerImpl.zzUnpackTrans$3(ClassicTokenizerImpl.ZZ_TRANS_PACKED_0, offset, result);
        return result;
    }
    static zzUnpackTrans$3(packed, offset, result) {
        let i = 0;
        let j = offset;
        let l = packed.length;
        while (i < l) {
            let count = packed.charCodeAt(i++);
            let value = packed.charCodeAt(i++);
            value--;
            do
                result[j++] = value;
            while (--count > 0);
        }
        return j;
    }
    static get ZZ_UNKNOWN_ERROR() {
        return 0;
    }
    static get ZZ_NO_MATCH() {
        return 1;
    }
    static get ZZ_PUSHBACK_2BIG() {
        return 2;
    }
    static get ZZ_ERROR_MSG() {
        delete ClassicTokenizerImpl.ZZ_ERROR_MSG;
        return ClassicTokenizerImpl.ZZ_ERROR_MSG = [
            "Unkown internal scanner error",
            "Error: could not match input",
            "Error: pushback value was too large"
        ];
    }
    static get ZZ_ATTRIBUTE() {
        delete ClassicTokenizerImpl.ZZ_ATTRIBUTE;
        return ClassicTokenizerImpl.ZZ_ATTRIBUTE = ClassicTokenizerImpl.zzUnpackAttribute$0();
    }
    static get ZZ_ATTRIBUTE_PACKED_0() {
        return "\u0001\0\u0001\u0009\u0003\u0001\u0001\u0009\u000b\0\u0004\u0001\u0002\0\u0001\u0001" + "\u0001\0\u000f\u0001\u0001\0\u0001\u0001\u0003\0\u0005\u0001";
    }
    static zzUnpackAttribute$0() {
        let result = new Array(50);
        let offset = 0;
        offset = ClassicTokenizerImpl.zzUnpackAttribute$3(ClassicTokenizerImpl.ZZ_ATTRIBUTE_PACKED_0, offset, result);
        return result;
    }
    static zzUnpackAttribute$3(packed, offset, result) {
        let i = 0;
        let j = offset;
        let l = packed.length;
        while (i < l) {
            let count = packed.charCodeAt(i++);
            let value = packed.charCodeAt(i++);
            do
                result[j++] = value;
            while (--count > 0);
        }
        return j;
    }
    static get ALPHANUM() {
        return StandardTokenizer.ALPHANUM;
    }
    static get APOSTROPHE() {
        return StandardTokenizer.APOSTROPHE;
    }
    static get ACRONYM() {
        return StandardTokenizer.ACRONYM;
    }
    static get COMPANY() {
        return StandardTokenizer.COMPANY;
    }
    static get EMAIL() {
        return StandardTokenizer.EMAIL;
    }
    static get HOST() {
        return StandardTokenizer.HOST;
    }
    static get NUM() {
        return StandardTokenizer.NUM;
    }
    static get CJ() {
        return StandardTokenizer.CJ;
    }
    static get ACRONYM_DEP() {
        return StandardTokenizer.ACRONYM_DEP;
    }
    static get TOKEN_TYPES() {
        delete ClassicTokenizerImpl.TOKEN_TYPES;
        return ClassicTokenizerImpl.TOKEN_TYPES = StandardTokenizer.TOKEN_TYPES;
    }
    yychar_fix() {
        return this.yychar;
    }
    getText(t) {
        t.copyBuffer(this.zzBuffer, this.zzStartRead, this.zzMarkedPos - this.zzStartRead);
    }
    setBufferSize(numChars) {
        throw new UnsupportedOperationException();
    }
    constructor(in$) {
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
        let x = 42;
    }
    static zzUnpackCMap(packed) {
        let map = new Array(0x110000);
        let i = 0;
        let j = 0;
        while (i < 1170) {
            let count = packed.charCodeAt(i++);
            let value = packed.charCodeAt(i++);
            do
                map[j++] = value;
            while (--count > 0);
        }
        return map;
    }
    zzRefill() {
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
            let newBuffer = new Array(this.zzBuffer.length * 2);
            System.arraycopy(this.zzBuffer, 0, newBuffer, 0, this.zzBuffer.length);
            this.zzBuffer = newBuffer;
            this.zzEndRead += this.zzFinalHighSurrogate;
            this.zzFinalHighSurrogate = 0;
        }
        let requested = this.zzBuffer.length - this.zzEndRead;
        let totalRead = 0;
        while (totalRead < requested) {
            let numRead = this.zzReader.read(this.zzBuffer, this.zzEndRead + totalRead, requested - totalRead);
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
    yyclose() {
        this.zzAtEOF = true;
        this.zzEndRead = this.zzStartRead;
        if (this.zzReader !== null)
            this.zzReader.close();
    }
    yyreset(reader) {
        this.zzReader = reader;
        this.zzAtBOL = true;
        this.zzAtEOF = false;
        this.zzEOFDone = false;
        this.zzEndRead = this.zzStartRead = 0;
        this.zzCurrentPos = this.zzMarkedPos = 0;
        this.zzFinalHighSurrogate = 0;
        this.yyline = this.yychar = this.yycolumn = 0;
        this.zzLexicalState = ClassicTokenizerImpl.YYINITIAL;
        if (this.zzBuffer.length > ClassicTokenizerImpl.ZZ_BUFFERSIZE)
            this.zzBuffer = new Array(ClassicTokenizerImpl.ZZ_BUFFERSIZE);
    }
    yystate() {
        return this.zzLexicalState;
    }
    yybegin(newState) {
        this.zzLexicalState = newState;
    }
    yytext() {
        return new String(this.zzBuffer, this.zzStartRead, this.zzMarkedPos - this.zzStartRead);
    }
    yycharat(pos) {
        return this.zzBuffer[this.zzStartRead + pos];
    }
    yylength() {
        return this.zzMarkedPos - this.zzStartRead;
    }
    zzScanError(errorCode) {
        let message;
        try {
            message = ClassicTokenizerImpl.ZZ_ERROR_MSG[errorCode];
        } catch (e) {
            if (e instanceof ArrayIndexOutOfBoundsException) {
                message = ClassicTokenizerImpl.ZZ_ERROR_MSG[ClassicTokenizerImpl.ZZ_UNKNOWN_ERROR];
            } else
                throw e;
        }
        throw new Error(message);
    }
    yypushback(number) {
        if (number > this.yylength())
            this.zzScanError(ClassicTokenizerImpl.ZZ_PUSHBACK_2BIG);
        this.zzMarkedPos -= number;
    }
    getNextToken() {
        let zzInput;
        let zzAction;
        let zzCurrentPosL;
        let zzMarkedPosL;
        let zzEndReadL = this.zzEndRead;
        let zzBufferL = this.zzBuffer;
        let zzCMapL = ClassicTokenizerImpl.ZZ_CMAP;
        let zzTransL = ClassicTokenizerImpl.ZZ_TRANS;
        let zzRowMapL = ClassicTokenizerImpl.ZZ_ROWMAP;
        let zzAttrL = ClassicTokenizerImpl.ZZ_ATTRIBUTE;
        while (true) {
            zzMarkedPosL = this.zzMarkedPos;
            this.yychar += zzMarkedPosL - this.zzStartRead;
            zzAction = -1;
            zzCurrentPosL = this.zzCurrentPos = this.zzStartRead = zzMarkedPosL;
            this.zzState = ClassicTokenizerImpl.ZZ_LEXSTATE[this.zzLexicalState];
            let zzAttributes = zzAttrL[this.zzState];
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
                        let eof = this.zzRefill();
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
                    let zzNext = zzTransL[zzRowMapL[this.zzState] + zzCMapL[zzInput]];
                    if (zzNext === -1)
                        break zzForAction;
                    this.zzState = zzNext;
                    zzAttributes = zzAttrL[this.zzState];
                    if ((zzAttributes & 1) === 1) {
                        zzAction = this.zzState;
                        zzMarkedPosL = zzCurrentPosL;
                        if ((zzAttributes & 8) === 8)
                            break zzForAction;
                    }
                }
            }
            this.zzMarkedPos = zzMarkedPosL;
            switch (zzAction < 0 ? zzAction : ClassicTokenizerImpl.ZZ_ACTION[zzAction]) {
            case 1: {
                    break;
                }
            case 11:
                break;
            case 2: {
                    return ClassicTokenizerImpl.ALPHANUM;
                }
            case 12:
                break;
            case 3: {
                    return ClassicTokenizerImpl.CJ;
                }
            case 13:
                break;
            case 4: {
                    return ClassicTokenizerImpl.HOST;
                }
            case 14:
                break;
            case 5: {
                    return ClassicTokenizerImpl.NUM;
                }
            case 15:
                break;
            case 6: {
                    return ClassicTokenizerImpl.APOSTROPHE;
                }
            case 16:
                break;
            case 7: {
                    return ClassicTokenizerImpl.COMPANY;
                }
            case 17:
                break;
            case 8: {
                    return ClassicTokenizerImpl.ACRONYM_DEP;
                }
            case 18:
                break;
            case 9: {
                    return ClassicTokenizerImpl.ACRONYM;
                }
            case 19:
                break;
            case 10: {
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
    ddd$0() {
    }
    ddd$1(a) {
    }
    static get zzzzzzzzzstatic() {
        delete ClassicTokenizerImpl.zzzzzzzzzstatic;
        return ClassicTokenizerImpl.zzzzzzzzzstatic = "hello";
    }
    static get uuuuuuustatic() {
        delete ClassicTokenizerImpl.uuuuuuustatic;
        return ClassicTokenizerImpl.uuuuuuustatic = null;
    }
    static set uuuuuuustatic(value) {
        delete ClassicTokenizerImpl.uuuuuuustatic;
        ClassicTokenizerImpl.uuuuuuustatic = value;
    }
    static dddstatic(a) {
    }
    static overstatic$1(a) {
    }
    static overstatic$0() {
    }
    static zzUnpackAction$2(packed1, offset) {
        let i = 0;
        let j = offset;
        let l = packed1.charCodeAt(1);
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
            let count = packed.ZZ_ACTION.charAt(i++).ZZ_ACTION.i.a.ZZ_ACTION(ClassicTokenizerImpl.ZZ_ACTION);
            let count1 = packed.ZZ_ACTION.charAt(i++).i;
            let count3 = this.zzzzzzzzz.charCodeAt(i++).i;
            let count4 = this.zzzzzzzzz.zzzzzzzzz;
            let value = ClassicTokenizerImpl.ZZ_ACTION.packeddfdfdfd.charAt(i++);
            let x = ClassicTokenizerImpl.ZZ_ACTION.packeddfdfdfd.ZZ_ACTION(c.i++);
            let f = ClassicTokenizerImpl.ZZ_ACTION[c.ZZ_ACTION].ZZ_ACTION[ClassicTokenizerImpl.ZZ_ACTION]++;
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
}
class Test {
    static kewords_scope(x, var$) {
        let in$ = 42;
        x += var$++;
        in$++;
        in$[in$++] = 42;
        test(in$[in$++], in$, var$);
    }
    static get ZZ_CMAP_PACKED() {
        delete Test.ZZ_CMAP_PACKED;
        return Test.ZZ_CMAP_PACKED = 0;
    }
    static set ZZ_CMAP_PACKED(value) {
        delete Test.ZZ_CMAP_PACKED;
        Test.ZZ_CMAP_PACKED = value;
    }
    static test_scope() {
        Test.ZZ_CMAP_PACKED = 42;
        let ZZ_CMAP_PACKED = 0;
        ZZ_CMAP_PACKED = 42;
    }
    static test_params_scope(ZZ_CMAP_PACKED, x) {
        ZZ_CMAP_PACKED = 42;
        ZZ_CMAP_PACKED.charAt();
        x.charCodeAt();
    }
    static test_while_scope() {
        while (true) {
            Test.ZZ_CMAP_PACKED = 42;
            let ZZ_CMAP_PACKED = 0;
            ZZ_CMAP_PACKED = 42;
        }
        Test.ZZ_CMAP_PACKED = 42;
    }
    static test_catch_scope() {
        Test.ZZ_CMAP_PACKED = 42;
        try {
            Test.ZZ_CMAP_PACKED = 42;
            let ZZ_CMAP_PACKED = 0;
            ZZ_CMAP_PACKED = 42;
        } catch (var$) {
            if (var$ instanceof String) {
                let x = var$;
                Test.ZZ_CMAP_PACKED.charAt();
                x.charCodeAt();
            } else if (var$ instanceof Ex) {
                Test.ZZ_CMAP_PACKED = 42;
                let ZZ_CMAP_PACKED = 0;
                ZZ_CMAP_PACKED = 42;
                var$++;
            } else
                throw var$;
        }
        Test.ZZ_CMAP_PACKED = 42;
        try {
            Test.ZZ_CMAP_PACKED = 42;
        } catch (ZZ_CMAP_PACKED) {
            if (ZZ_CMAP_PACKED instanceof aaa) {
                ZZ_CMAP_PACKED = 42;
                let ZZ_CMAP_PACKED = 0;
                ZZ_CMAP_PACKED = 42;
            } else
                throw ZZ_CMAP_PACKED;
        }
        Test.ZZ_CMAP_PACKED = 42;
        try {
            Test.ZZ_CMAP_PACKED = 42;
        } catch (ex) {
            if (ex instanceof ZZ_CMAP_PACKED) {
                Test.ZZ_CMAP_PACKED = 42;
                let ZZ_CMAP_PACKED = 0;
                ZZ_CMAP_PACKED = 42;
            } else
                throw ex;
        }
        Test.ZZ_CMAP_PACKED = 42;
        let ZZ_CMAP_PACKED = 0;
        ZZ_CMAP_PACKED = 42;
    }
    static test_for_scope() {
        Test.ZZ_CMAP_PACKED = 42;
        ;
        for (; x < 1; x++) {
            Test.ZZ_CMAP_PACKED = 42;
            let ZZ_CMAP_PACKED = 0;
            ZZ_CMAP_PACKED = 42;
        }
        Test.ZZ_CMAP_PACKED = 42;
        for (let ZZ_CMAP_PACKED = 1; x;) {
            ZZ_CMAP_PACKED = 42;
            let ZZ_CMAP_PACKED = 0;
            ZZ_CMAP_PACKED = 42;
        }
        for (let x = "hello"; x;) {
            x.charCodeAt();
        }
        Test.ZZ_CMAP_PACKED = 42;
        for (let ZZ_CMAP_PACKED = 1; ZZ_CMAP_PACKED < 1; ZZ_CMAP_PACKED++) {
            ZZ_CMAP_PACKED = 42;
        }
        for (let x = YYEOF, var$ = 42; var$ > 0 && x < 1; x++, var$++) {
        }
        Test.ZZ_CMAP_PACKED = 42;
        let ZZ_CMAP_PACKED = 0;
        ZZ_CMAP_PACKED = 42;
    }
    test_instanceof() {
        x instanceof ZZ_CMAP_PACKED;
        x instanceof rwggbdhdfhjukgjsdgfsagdhjdjh;
        if (Test.ZZ_CMAP_PACKED++) {
        }
        if (Test.ZZ_CMAP_PACKED instanceof ZZ_CMAP_PACKED) {
        }
        Test.ZZ_CMAP_PACKED = 42;
        let ZZ_CMAP_PACKED = 0;
        ZZ_CMAP_PACKED = 42;
    }
    static get static_double_init_test() {
        delete Test.static_double_init_test;
        return Test.static_double_init_test = 0.0;
    }
    static set static_double_init_test(value) {
        delete Test.static_double_init_test;
        Test.static_double_init_test = value;
    }
    static get static_float_init_test() {
        delete Test.static_float_init_test;
        return Test.static_float_init_test = 0.0;
    }
    static set static_float_init_test(value) {
        delete Test.static_float_init_test;
        Test.static_float_init_test = value;
    }
    static get static_char_init_test() {
        delete Test.static_char_init_test;
        return Test.static_char_init_test = '\u0000';
    }
    static set static_char_init_test(value) {
        delete Test.static_char_init_test;
        Test.static_char_init_test = value;
    }
    static get static_string_init_test() {
        delete Test.static_string_init_test;
        return Test.static_string_init_test = null;
    }
    static set static_string_init_test(value) {
        delete Test.static_string_init_test;
        Test.static_string_init_test = value;
    }
    static get static_boolean_init_test() {
        delete Test.static_boolean_init_test;
        return Test.static_boolean_init_test = false;
    }
    static set static_boolean_init_test(value) {
        delete Test.static_boolean_init_test;
        Test.static_boolean_init_test = value;
    }
    static get static_int_init_test() {
        delete Test.static_int_init_test;
        return Test.static_int_init_test = 0;
    }
    static set static_int_init_test(value) {
        delete Test.static_int_init_test;
        Test.static_int_init_test = value;
    }
    static get static_short_init_test() {
        delete Test.static_short_init_test;
        return Test.static_short_init_test = 0;
    }
    static set static_short_init_test(value) {
        delete Test.static_short_init_test;
        Test.static_short_init_test = value;
    }
    static get static_long_init_test() {
        delete Test.static_long_init_test;
        return Test.static_long_init_test = 0;
    }
    static set static_long_init_test(value) {
        delete Test.static_long_init_test;
        Test.static_long_init_test = value;
    }
    testyychar1() {
        return this.testyychar;
    }
    testyycharover1$0() {
        return this.testyycharover;
    }
    testyycharover1$1(x) {
        return this.testyycharover;
    }
    test_abstract() {
        throw 'NotImpl < test_abstract >';
    }
    constructor() {
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
}
class TestInterface {
    test() {
        throw 'NotImpl < test >';
    }
}
class TestInterfaceClass extends TestInterface {
}
class TestExtendsClass extends TestInterface {
}
class NumberExtendsClass extends TestInterface {
    constructor() {
        super();
        this.x = 42;
        this.y = 0b1011;
        this.z = 0o52;
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
        this.y1 = -0b1011;
        this.z1 = -0o52;
        this.k1 = -0xa5;
        this.x2 = +42;
        this.y2 = +0b1011;
        this.z2 = +0o52;
        this.k2 = +0xa5;
        this.t1 = 0xDFFF;
        this.t2 = 0xDFFF;
        this.t3 = 0xDFFd;
        this.t4 = 0xDFFD;
    }
}
class Animal {
    constructor(name) {
        this.name = null;
        this.name = name;
    }
    static MessageBox(msg) {
        alert(msg);
    }
    move$1(meters) {
        Animal.MessageBox(this.name + " \u0023moved " + meters + "m.");
    }
    move$0() {
        throw 'NotImpl < move$0 >';
    }
    static get U_YIN_YANG() {
        return '\u262F';
    }
    static get U_CAUTION_SIGN() {
        return '\u2621';
    }
    static get test_octal() {
        return '\u0023';
    }
    static get test_octal1() {
        return '\u0000';
    }
    static get test_not_final() {
        delete Animal.test_not_final;
        return Animal.test_not_final = 'a';
    }
    static set test_not_final(value) {
        delete Animal.test_not_final;
        Animal.test_not_final = value;
    }
    static get test_not_final1() {
        delete Animal.test_not_final1;
        return Animal.test_not_final1 = '\u0000';
    }
    static set test_not_final1(value) {
        delete Animal.test_not_final1;
        Animal.test_not_final1 = value;
    }
    static get test_not_final_not_literal() {
        delete Animal.test_not_final_not_literal;
        return Animal.test_not_final_not_literal = null;
    }
    static set test_not_final_not_literal(value) {
        delete Animal.test_not_final_not_literal;
        Animal.test_not_final_not_literal = value;
    }
}
class Snake extends Animal {
    constructor(name) {
        super(name);
    }
    move$0() {
        Animal.MessageBox("Slithering...");
        super.move$1(3);
    }
}
class Horse extends Animal {
    constructor(name) {
        super(name);
    }
    move$0() {
        Horse.MessageBox("Galloping...");
        super.move$1(-0x2a);
    }
}
class BabelEvaluate {
    static main(args) {
        let animals = [
            new Snake(Animal.U_CAUTION_SIGN + "Sammy the Python\u0001\u005a\n\u4321"),
            new Horse(Animal.U_YIN_YANG + "Tommy the Palomino")
        ];
        for (let i = 0; i < animals.length; i++) {
            animals[i].move$0();
        }
        let i1, i2;
        for (i1 = 42, i2 = codePointOffset;;) {
        }
    }
}
class Horse1 extends I.AM.NOT.IN.COMPILATION_UNIT.Animal {
}
class I_AM_IN_COMPILATION_UNIT_Animal {
    hello() {
        this.test++;
        this.horse_p = null;
        this.hello_p();
        I_AM_IN_COMPILATION_UNIT_Animal.hello_s();
    }
    static hello_s() {
        this.test++;
        this.horse_p = null;
    }
    hello_p() {
        this.test++;
        this.horse_p = null;
    }
    constructor() {
        this.test = 0;
        this.horse_p = null;
    }
}
class Horse2 extends I_AM_IN_COMPILATION_UNIT_Animal {
    hello1() {
        this.hello();
        Horse2.hello_s();
        this.test++;
        horse_p = null;
        Horse2.test3_s++;
        Horse2.test4_p++;
        this.test5++;
        hello_p();
        this.hello_p1();
        Horse2.hello_s2();
    }
    hello_p1() {
    }
    static hello_s2() {
    }
    static get test3_s() {
        delete Horse2.test3_s;
        return Horse2.test3_s = 'a';
    }
    static set test3_s(value) {
        delete Horse2.test3_s;
        Horse2.test3_s = value;
    }
    static get test4_p() {
        delete Horse2.test4_p;
        return Horse2.test4_p = 0;
    }
    static set test4_p(value) {
        delete Horse2.test4_p;
        Horse2.test4_p = value;
    }
    constructor() {
        super();
        this.test5 = 0;
    }
}
class Horse3 extends Horse2 {
    hello1() {
        this.hello();
        this.hello1();
        this.test++;
        Horse3.test3_s++;
        test4_p++;
        this.test5++;
        this.horse_p = null;
        Horse3.hello_s();
        hello_p();
        hello_p1();
        Horse3.hello_s2();
    }
    hello_self() {
        this.hello();
        this.hello1();
        this.test++;
        I_AM_IN_COMPILATION_UNIT_Animal.test3_s++;
        I_AM_IN_COMPILATION_UNIT_Animal.test4_p++;
        this.test5++;
        this.horse_p = null;
        I_AM_IN_COMPILATION_UNIT_Animal.hello_s();
        this.hello_p();
    }
    constructor() {
        super();
        this.horse_p = null;
    }
}
