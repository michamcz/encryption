"use strict";

const codebutton = document.getElementById("codebutton");
const decodebutton = document.getElementById("decodebutton");
const select = document.getElementById("selector");
const area1 = document.getElementById("area1");
const area2 = document.getElementById("area2");
const moveArea = document.getElementById("moveArea");
const lp = document.getElementById("lp");
const info = document.getElementById("info");
const keyArea = document.getElementById("keyArea");
const keykey = document.getElementById("keykey");


const reg1 = /^([0-9]{0,2})$/;
const reg2 = /^([a-zA-Z]*)$/;

let func = switch_code(select);
let move = 3;
let key = "";


moveArea.style.display = "block";
info.style.display = "none";
keyArea.style.display = "none";

const morseChars = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."];
const morseDigits = ["-----", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----."];

codebutton.addEventListener("change", function () { area1.placeholder = "Type text..."; parseAndDisplay(); });
decodebutton.addEventListener("change", function () { area1.placeholder = "Type cryptogram..."; parseAndDisplay(); });
select.addEventListener("change", function () { func = switch_code(select); parseAndDisplay(); });
area1.addEventListener("input", function () { area1.placeholder = "Type cryptogram..."; parseAndDisplay(); });
lp.addEventListener("input", function () { move = onlyNumber(lp.value); parseAndDisplay(); });
keyArea.addEventListener("input", function () { key = onlyChars(keykey.value); parseAndDisplay(); });


function onlyNumber(lpVal) {

	if (reg1.test(lpVal) && (lpVal >= 0 && lpVal < 26)) {

		return Math.abs(lpVal);
	}

	else {

		lp.value = move;
		return move;
	}
}


function onlyChars(keyVal) {


	if (reg2.test(keyVal)) {

		return keyVal;
	}

	else {

		keykey.value = key;
		return key;
	}
}


function switch_code(select) {

	moveArea.style.display = "none";
	info.style.display = "none";
	keyArea.style.display = "none";

	for (let i = 0; i < select.options.length; i++) {

		if (select.options[i].selected) {

			return select.options[i].value;
		}
	}
}


function parseAndDisplay() {

	area2.value = parsers[func](area1.value);

}


const parsers = {

	cezar: function (val) {

		moveArea.style.display = "block";

		return val.split("").map(function (x) {
			let ch = x.charCodeAt(0);

			if (ch >= 65 && ch <= 90) { //big letters

				if (codebutton.checked) {

					ch = 65 + (ch - 65 + move) % 26;
				}

				else {

					ch = 65 + (ch - 39 - move) % 26;
				}

				return String.fromCharCode(ch);
			}


			else if (ch >= 97 && ch <= 122) { //small letters

				if (codebutton.checked) {

					ch = 97 + (ch - 97 + move) % 26;
				}

				else {

					ch = 97 + (ch - 71 - move) % 26;
				}

				return String.fromCharCode(ch);
			}

			else return x;
		}).join("");

	},


	mors: function (val) {


		if (codebutton.checked) {   // morse coding

			info.style.display = "none";

			return val.split("").map(function (x) {

				let ch = x.toUpperCase().charCodeAt(0);

				if (ch >= 65 && ch <= 90) {   //morse chars

					ch = ch - 65;
					return morseChars[ch] + " ";
				}

				else if (ch >= 48 && ch <= 57) {   //morse digits

					ch = ch - 48;
					return morseDigits[ch] + " ";
				}

				else return " ";

			}).join("");

		}

		else {    // morse'a decoding

			info.style.display = "block";

			return val.split(" ").map(function (x) {


				for (let i = 0; i < morseChars.length; i++) {   //morse chars

					if (x == morseChars[i]) {

						return String.fromCharCode(i + 65).toLowerCase();
					}
				}

				for (let i = 0; i < morseDigits.length; i++) {   //morse digits

					if (x == morseDigits[i]) {

						return String.fromCharCode(i + 48);
					}
				}

				if (x == "") return " ";


			}).join("");
		}

	},


	vigener: function (val) {

		keyArea.style.display = "block";

		let keyArray = key.split("").map(function (x) {

			let ch = x.toUpperCase().charCodeAt(0);

			if (ch >= 65 && ch <= 90) {

				return ch - 65;
			}
		});


		return val.split("").map(function (x, index) {

			let ch = x.charCodeAt(0);

			if (keyArray.length === 0) {   //empty key

				return x;
			}

			if (ch >= 65 && ch <= 90) {   //big letters

				if (codebutton.checked) {

					ch = 65 + (ch - 65 + keyArray[index % keyArray.length]) % 26;
				}

				else {

					ch = 65 + (ch - 39 - keyArray[index % keyArray.length]) % 26;
				}

				return String.fromCharCode(ch);
			}


			else if (ch >= 97 && ch <= 122) {   //small letters

				if (codebutton.checked) {

					ch = 97 + (ch - 97 + keyArray[index % keyArray.length]) % 26;
				}

				else {

					ch = 97 + (ch - 71 - keyArray[index % keyArray.length]) % 26;
				}

				return String.fromCharCode(ch);
			}

			else return x;

		}).join("");

	},

};



