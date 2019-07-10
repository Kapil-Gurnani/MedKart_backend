var CryptoJS = require("crypto-js");
let password = "U2FsdGVkX1+wv6XEYJUjPV8wnKAyXV6R9zIFxHH1pe8=";
let bytes = CryptoJS.AES.decrypt(password, 'Kapil');
var decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
console.log(decryptedPassword);
// var CryptoJS = require("crypto-js");
 
// var data = [{id: 1}, {id: 2}]
 
// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
//  console.log(ciphertext.toString());
// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'Kapil');
// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 
// console.log(decryptedData);