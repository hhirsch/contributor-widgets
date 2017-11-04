(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Json_1 = require("./Json");
function sortByContributions(x, y) {
    return y.contributions - x.contributions;
}

var ContributorWidget = function () {
    function ContributorWidget() {
        _classCallCheck(this, ContributorWidget);

        var widgetDivs = document.getElementsByClassName("gh-contrib-widget");
        for (var i = 0; i < widgetDivs.length; i++) {
            var targetDiv = widgetDivs.item(i);
            this.loadData(targetDiv);
        }
    }

    _createClass(ContributorWidget, [{
        key: "loadData",
        value: function loadData(targetDiv) {
            var jsonUrl = 'https://api.github.com/repos/' + targetDiv.dataset.repository + '/contributors';
            var dataHandler = function dataHandler(widget, error, data) {
                if (error !== null) {
                    console.log('Could not load data: ' + error);
                } else {
                    widget.contributorsJson = data;
                    widget.render(targetDiv);
                }
            };
            Json_1.getJsonCallback(this, jsonUrl, dataHandler);
        }
    }, {
        key: "render",
        value: function render(targetDiv) {
            var data = this.contributorsJson;
            if (targetDiv != null) {
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
                        targetDiv.appendChild(contributorDiv);
                    }
                }
            } else {
                console.log('Target diff for contributions widget with id ' + this.configJson.targetDivId + ' not found.');
            }
        }
    }]);

    return ContributorWidget;
}();

exports.ContributorWidget = ContributorWidget;

},{"./Json":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getJsonCallback(widget, url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(widget, null, xhr.response);
        } else {
            callback(widget, status, xhr.response);
        }
    };
    xhr.send();
}
exports.getJsonCallback = getJsonCallback;
;
function getJsonFromUrl(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status !== 200) {
            throw new Error('Got error ' + status + ' for URL ' + url);
        }
    };
    xhr.send();
}
exports.getJsonFromUrl = getJsonFromUrl;
;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContributorWidget_1 = require("./ContributorWidget");
function installGithubContributionWidget() {
    try {
        var widget = new ContributorWidget_1.ContributorWidget();
    } catch (e) {
        console.log(e.name + ': ' + e.message);
    }
}
window.installGithubContributionWidget = installGithubContributionWidget;

},{"./ContributorWidget":1}]},{},[3])

//# sourceMappingURL=bundle.js.map
