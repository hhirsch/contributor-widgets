import { getJsonFromUrl } from "./Json";
import { getJsonCallback } from "./Json";

function sortByContributions(x: Contributor, y: Contributor) {
  return  y.contributions - x.contributions;
}

export interface ContributorWidgetConfig {
    targetDivId: string
}

export interface Contributor {
    contributions:number,
    html_url: string,
    login: string
}

export class ContributorWidget {
    configJson: any;
    contributorsJson: Contributor[];

    constructor() {
        var widgetDivs = document.getElementsByClassName("gh-contrib-widget");
        for(var i = 0; i < widgetDivs.length; i++) {
            var targetDiv = widgetDivs.item(i);
            this.loadData(targetDiv);
        }
    }

    loadData(targetDiv: any): void {
        var jsonUrl: string =
            'https://api.github.com/repos/' + targetDiv.dataset.repository + '/contributors';
        var dataHandler = function(widget: any, error: string, data: Contributor[]){
            if (error !== null) {
                console.log('Could not load data: ' + error);
            } else {
                widget.contributorsJson = data;
                widget.render(targetDiv);
            }
        }
        getJsonCallback(this, jsonUrl, dataHandler);
    }

    render(targetDiv: any): void {
        var data = this.contributorsJson;
        if (targetDiv != null) {
        data.sort(sortByContributions);
        var blockedUsers = new Array("gitter-badger");
        for(var n=0;n<data.length;n++){
            var contributor: Contributor = data[n];
            if(blockedUsers.indexOf(contributor.login) == -1) {
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
}
