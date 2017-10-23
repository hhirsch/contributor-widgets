(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Json_1 = require("./Json");
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
    var dataHandler = function dataHandler(error, data) {
        if (error !== null) {
            console.log('Could not load data: ' + error);
        } else {
            renderList(targetDiv, data);
        }
    };
    Json_1.getJson(url, dataHandler);
}
window.showContributionWidget = showContributionWidget;

},{"./Json":1}]},{},[2])

//# sourceMappingURL=bundle.js.map
