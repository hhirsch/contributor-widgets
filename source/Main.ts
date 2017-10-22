import { sayHello } from "./Greet";
import { getJson } from "./Json";

interface Contributor {
    contributions:number,
    html_url: string,
    login: string
}

function showHello(divName: string, name: string) {
    const element = document.getElementById(divName);
    element.innerText = sayHello(name);
}

function sortByContributions(x: Contributor, y: Contributor) {
  return  y.contributions - x.contributions;
}

function renderList(targetDiv: string, data: Contributor[]) {
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
            document.getElementById(targetDiv).appendChild(contributorDiv);
        }
    }
}

function showContributionWidget(targetDiv: string, url: string): void {
    getJson(url,
            function(error: string, data: Contributor[]) {
                if (error !== null) {
                    console.log('Could not load data: ' + error);
                } else {
                    renderList(targetDiv, data);
                }
            });
}

showContributionWidget('contributors', 'https://api.github.com/repos/GlPortal/glPortal/contributors');
showHello("greeting", "TypeScript");
