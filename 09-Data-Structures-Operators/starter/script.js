"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const airline = "TAP Air Portugal";
const plane = "A320";

function maskCreditCard(num) {
  const string = String(num);

  const slicedString = string.slice(-4);
  return slicedString.padStart(string.length, "*");
}

console.log(maskCreditCard(94939299));
console.log(maskCreditCard("343434343434442432432243443490978"));
