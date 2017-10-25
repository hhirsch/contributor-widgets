import { getJsonFromUrl } from "./Json";
import { getJsonCallback } from "./Json";

function sortByContributions(x: Contributor, y: Contributor) {
  return  y.contributions - x.contributions;
}

interface ContributorWidgetConfig {
    targetDivId: string,
    repository:string,
}

interface Contributor {
    contributions:number,
    html_url: string,
    login: string
}

class ContributorWidget {
    configJson: any;
    contributorsJson: Contributor[];

    constructor(config: ContributorWidgetConfig) {
        this.configJson = config;
        var jsonUrl: string =
            'https://api.github.com/repos/' + this.configJson.repository + '/contributors';
        var dataHandler = function(widget: any, error: string, data: Contributor[]){
            if (error !== null) {
                console.log('Could not load data: ' + error);
            } else {
                widget.contributorsJson = data;
                widget.render();
            }
        }
        getJsonCallback(this, jsonUrl, dataHandler);
    }

    render(): void {
        var data = this.contributorsJson;
        var targetDiv = document.getElementById(this.configJson.targetDivId);
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

function installGithubContributionWidget(targetDiv: string, repo: string): void {
    try {
        var config: ContributorWidgetConfig = { "targetDivId": targetDiv, "repository": repo};
        var widget: ContributorWidget = new ContributorWidget(config);
        widget.render();
    } catch (e) {
        console.log(e.name + ': ' + e.message);
    }
}

(<any>window).installGithubContributionWidget = installGithubContributionWidget;
