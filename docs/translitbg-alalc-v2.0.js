!function () {
  "use strict";

  var t;

  // Combining characters
  var tie = "\u0361";  // COMBINING DOUBLE INVERTED BREVE (used as tie bar)
  var breve = "\u0306"; // COMBINING BREVE
  var commaAbove = "\u0313"; // Not used but here for future accents
  var invertedBreve = "\u0311"; // Used for nasal vowel (ѫ = u̐)

  var e = {
    default: function (t) {
      return function (t, e) {
        for (var s, i = [], o = t.split(""), r = 0; r < o.length; r++) {
          var u = o[r],
            c = e.c[u];
          var a = o[r + 1];

          // ALA-LC: Final-position ъ becomes "
          if ((u === 'ъ' || u === 'Ъ') && (!a || !/[\p{Script=Cyrillic}]/u.test(a))) {
            i.push('"');
            s = u;
            continue;
          }

          if (c) {
            if (a) {
              var h = e.t[u + a];
              if (h) {
                var n = o[r + 2];
                if (!n || !/^\w+$/.test(n)) {
                  i.push(h), r++, s = n;
                  continue;
                }
              }
            }
            var n = e.ucc[u];
            !n || (a && !f[a] && e.c[a] && !e.c[s]) ? i.push(c) : i.push(n);
          } else i.push(u);
          s = u;
        }
        return i.join("");
      }(t, s);
    },
  };

  // Mixed-case uppercase detector
  var f = {
    "А": "A", "Б": "B", "В": "V", "Г": "G", "Д": "D", "Е": "E",
    "Ж": "Zh", "З": "Z", "И": "I", "Й": "Ĭ", "К": "K", "Л": "L",
    "М": "M", "Н": "N", "О": "O", "П": "P", "Р": "R", "С": "S",
    "Т": "T", "У": "U", "Ф": "F", "Х": "Kh", "Ц": "T" + tie + "s",
    "Ч": "Ch", "Ш": "Sh", "Щ": "Sht", "Ъ": "Ŭ", "Ь": "'", "Ю": "I" + tie + "u",
    "Я": "I" + tie + "a", "Ѣ": "I" + tie + "e", "Ѫ": "U\u0310"
  };

  var s = {
    c: {
      "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e",
      "ж": "zh", "з": "z", "и": "i", "ѝ": "i", "й": "ĭ", "к": "k",
      "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r",
      "с": "s", "т": "t", "у": "u", "ф": "f", "х": "kh", "ц": "t" + tie + "s",
      "ч": "ch", "ш": "sh", "щ": "sht", "ъ": "ŭ", "ь": "'",
      "ю": "i" + tie + "u", "я": "i" + tie + "a", "ѣ": "i" + tie + "e", "ѫ": "u\u0310"
    },
    t: {
      // Optional contextual tweaks
    },
    ucc: {
      "Ж": "ZH", "Ц": "T" + tie + "S", "Х": "KH", "Ч": "CH", "Ш": "SH",
      "Щ": "SHT", "Ю": "I" + tie + "U", "Я": "I" + tie + "A", "Й": "Ĭ",
      "Ъ": "Ŭ", "Ь": "'", "Ѣ": "I" + tie + "E", "Ѫ": "U\u0310"
    }
  };

  // Merge f into s.c
  for (t in f) s.c[t] = f[t];

  // Export
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e)
    : "object" == typeof exports
      ? (exports.translitbg = e)
      : (this.translitbg = e.default);
}.call(this);
