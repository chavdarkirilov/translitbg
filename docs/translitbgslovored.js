/*
* This script transliterate Bulgarian Cyrillic to English (Latin) script following the
* latest rules published from Bulgarian government.
*
* NOTE!!!
* This file is in UTF-8 encoding and when included in the html should be specified.
*
* Copyright Slovored.com (c) 2009
*/

var tr = new Array();
tr["А"] = "A";
tr["Б"] = "B";
tr["В"] = "V";
tr["Г"] = "G";
tr["Д"] = "D";
tr["Е"] = "E";
tr["Ж"] = "Zh";
tr["З"] = "Z";
tr["И"] = "I";
tr["Й"] = "Y";
tr["К"] = "K";
tr["Л"] = "L";
tr["М"] = "M";
tr["Н"] = "N";
tr["О"] = "O";
tr["П"] = "P";
tr["Р"] = "R";
tr["С"] = "S";
tr["Т"] = "T";
tr["У"] = "U";
tr["Ф"] = "F";
tr["Х"] = "H";
tr["Ц"] = "Ts";
tr["Ч"] = "Ch";
tr["Ш"] = "Sh";
tr["Щ"] = "Sht";
tr["Ъ"] = "A";
tr["Ь"] = "Y";
tr["Ю"] = "Yu";
tr["Я"] = "Ya";


function transliterate() {
	var text = document.getElementById("trEnter").value;
	var result = "";

	for (var i = 0; i < text.length; i++) {
		var c = text.charAt(i);
		var up = c.toUpperCase();
		if (typeof(tr[up]) == "undefined") {
			result += c;
		} else {
			// Note that there is a one special case which is hardcoded here
			// "ия" at the end of word is translated to "ia".
			// For example: София - Sofia, but софиянец - sofiyanets.
			// E.g. "я" at the end becomes "a" (not "ya") if previous char is "и".
			var repl = tr[up];
			if (up == "Я") {
				// Check the previous letter if exists
				if ((i > 0) && (text.charAt(i - 1).toUpperCase() == "И")) {
					// Check the next letter if exists
					if ((i + 1 == text.length) || ((i + 1 < text.length) && (typeof(tr[text.charAt(i + 1).toUpperCase()]) == "undefined"))) {
						repl = "A";
					}
				}
			}
			// There is one more exception България - Bulgaria, not Balgaria as
			// should be according to rules and previous exception.
			if (up == "Ъ") {
				// Check the previous letter if exists
				if ((i > 0) && (text.charAt(i - 1).toUpperCase() == "Б")) {
					// Check the letter before previous
					if ((i == 1) || ((i > 1) && (typeof(tr[text.charAt(i - 2).toUpperCase()]) == "undefined"))) {
						// Check the next letters
						if ((i + 6 < text.length) && (text.substring(i + 1, i + 7).toUpperCase() == "ЛГАРИЯ")) {
							// Check the letter after the next
							if ((i + 7 == text.length) || ((i + 7 < text.length) && (typeof(tr[text.charAt(i + 7).toUpperCase()]) == "undefined"))) {
								repl = "U";
							}
						}
					}
				}
			}
			if (c != up) {
				repl = repl.toLowerCase();
			}
			result += repl;
		}
	}
	document.getElementById("trResult").value = result;
	return true;
}
