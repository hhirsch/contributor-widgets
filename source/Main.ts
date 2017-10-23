import { getJson } from "./Json";

interface Contributor {
    contributions:number,
    html_url: string,
    login: string
}

function sortByContributions(x: Contributor, y: Contributor) {
  return  y.contributions - x.contributions;
}

function renderList(targetDivId: string, data: Contributor[]) {
    var targetDiv = document.getElementById(targetDivId);
    if (targetDiv != null) {
        data.sort(sortByContributions);
        var blockedUsers = new Array("gitter-badger");
        for(var n=0;n<data.length;n++){
            var contributor = data[n];
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
        console.log('Target diff for contributions widget with id ' + targetDivId + ' not found.');
    }
}

function installContributionWidget(targetDiv: string, url: string): void {
    var dataHandler = function(error: string, data: Contributor[]){
        if (error !== null) {
            console.log('Could not load data: ' + error);
        } else {
            renderList(targetDiv, data);
        }
    }
    getJson(url, dataHandler);
}

function installGithubContributionWidget(targetDiv: string, repo: string): void {
    installContributionWidget(targetDiv, 'https://api.github.com/repos/' + repo + '/contributors');
}

(<any>window).installContributionWidget = installContributionWidget;
(<any>window).installGithubContributionWidget = installGithubContributionWidget;
