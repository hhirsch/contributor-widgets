(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function sayHello(name) {
    return "Hello from " + name;
}
exports.sayHello = sayHello;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getJson(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
}
exports.getJson = getJson;
;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Greet_1 = require("./Greet");
var Json_1 = require("./Json");
function showHello(divName, name) {
    var element = document.getElementById(divName);
    element.innerText = Greet_1.sayHello(name);
}
function sortByContributions(x, y) {
    return y.contributions - x.contributions;
}
function renderList(targetDiv, data) {
    data.sort(sortByContributions);
    var blockedUsers = new Array("gitter-badger");
    for (var n = 0; n < data.length; n++) {
        var contributor = data[n];
        if (blockedUsers.indexOf(contributor.login) == -1) {
            var contributorDiv = document.createElement('div');
            var contributorHtml = '<a href=\"' + contributor.html_url + '\" target=\"_blank\">';
            contributorHtml += contributor.login;
            contributorHtml += '</a></br>';
            contributorDiv.innerHTML = contributorHtml;
            document.getElementById(targetDiv).appendChild(contributorDiv);
        }
    }
}
function showContributionWidget(targetDiv, url) {
    Json_1.getJson(url, function (error, data) {
        if (error !== null) {
            console.log('Could not load data: ' + error);
        } else {
            renderList(targetDiv, data);
        }
    });
}
showContributionWidget('contributors', 'https://api.github.com/repos/GlPortal/glPortal/contributors');
showHello("greeting", "TypeScript");

},{"./Greet":1,"./Json":2}]},{},[3])

//# sourceMappingURL=bundle.js.map
