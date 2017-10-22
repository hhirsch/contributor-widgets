"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Greet_1 = require("./Greet");
function showHello(divName, name) {
    var elt = document.getElementById(divName);
    elt.innerText = Greet_1.sayHello(name);
}
showHello("greeting", "TypeScript");
