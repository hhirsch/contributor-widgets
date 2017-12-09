(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Contributor = function () {
    function Contributor(contributorJson) {
        _classCallCheck(this, Contributor);

        this.name = contributorJson.login;
        this.profileUrl = contributorJson.html_url;
        this.contributions = contributorJson.contributions;
    }

    _createClass(Contributor, [{
        key: "isOnList",
        value: function isOnList(userList) {
            if (userList.indexOf(this.name) == -1) {
                return false;
            }
            return true;
        }
    }, {
        key: "getName",
        value: function getName() {
            return this.name;
        }
    }, {
        key: "getProfileUrl",
        value: function getProfileUrl() {
            return this.profileUrl;
        }
    }, {
        key: "getContributions",
        value: function getContributions() {
            return this.contributions;
        }
    }]);

    return Contributor;
}();

exports.Contributor = Contributor;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Json_1 = require("./Json");
var ContributorWidgetRenderer_1 = require("./ContributorWidgetRenderer");

var ContributorWidget = function () {
    function ContributorWidget() {
        _classCallCheck(this, ContributorWidget);

        this.renderer = new ContributorWidgetRenderer_1.ContributorWidgetRenderer();
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
            var dataHandler = function dataHandler(renderer, error, data) {
                if (error !== null) {
                    console.log('Could not load data: ' + error);
                } else {
                    renderer.render(targetDiv, data);
                }
            };
            Json_1.getJsonCallback(this.renderer, jsonUrl, dataHandler);
        }
    }]);

    return ContributorWidget;
}();

exports.ContributorWidget = ContributorWidget;

},{"./ContributorWidgetRenderer":3,"./Json":5}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Contributor_1 = require("./Contributor");
var HtmlService_1 = require("./HtmlService");
function sortByContributions(x, y) {
    return y.contributions - x.contributions;
}

var ContributorWidgetRenderer = function () {
    function ContributorWidgetRenderer() {
        _classCallCheck(this, ContributorWidgetRenderer);
    }

    _createClass(ContributorWidgetRenderer, [{
        key: "render",
        value: function render(targetDiv, contributors) {
            var htmlService;
            var blockedUsers = new Array("gitter-badger");
            htmlService = new HtmlService_1.HtmlService();
            if (targetDiv != null) {
                contributors.sort(sortByContributions);
                for (var n = 0; n < contributors.length; n++) {
                    var contributor = new Contributor_1.Contributor(contributors[n]);
                    if (!contributor.isOnList(blockedUsers)) {
                        var contributorDiv = document.createElement('div');
                        var contributorHtml = htmlService.getAnchorHtml(contributor.getProfileUrl(), contributor.getName());
                        contributorHtml += '</br>';
                        contributorDiv.innerHTML = contributorHtml;
                        targetDiv.appendChild(contributorDiv);
                    }
                }
            } else {
                console.log('Target div not found.');
            }
        }
    }]);

    return ContributorWidgetRenderer;
}();

exports.ContributorWidgetRenderer = ContributorWidgetRenderer;

},{"./Contributor":1,"./HtmlService":4}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var HtmlService = function () {
    function HtmlService() {
        _classCallCheck(this, HtmlService);
    }

    _createClass(HtmlService, [{
        key: "getAnchorHtml",
        value: function getAnchorHtml(url, content) {
            var html = '<a href=\"' + url + '\" target=\"_blank\">';
            html += content;
            html += '</a>';
            return html;
        }
    }]);

    return HtmlService;
}();

exports.HtmlService = HtmlService;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContributorWidget_1 = require("./ContributorWidget");
function installGithubContributorWidget() {
    try {
        var widget = new ContributorWidget_1.ContributorWidget();
    } catch (e) {
        console.log(e.name + ': ' + e.message);
    }
}
window.installGithubContributorWidget = installGithubContributorWidget;

},{"./ContributorWidget":2}]},{},[6])

//# sourceMappingURL=bundle.js.map
