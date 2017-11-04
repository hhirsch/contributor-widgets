import { getJsonFromUrl } from "./Json";
import { getJsonCallback } from "./Json";
import { Contributor } from "./Contributor";

function sortByContributions(x: Contributor, y: Contributor) {
  return  y.contributions - x.contributions;
}

export class ContributorWidgetRenderer {
    contributorsJson: Contributor[];

    render(targetDiv: any, contributors: Contributor[]): void {
        if (targetDiv != null) {
        contributors.sort(sortByContributions);
        var blockedUsers = new Array("gitter-badger");
        for(var n=0;n<contributors.length;n++){
            var contributor: Contributor = contributors[n];
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
        console.log('Target div not found.');
    }
    }
}
