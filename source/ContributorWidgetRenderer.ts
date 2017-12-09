import { getJsonFromUrl } from "./Json";
import { getJsonCallback } from "./Json";
import { ContributorJson } from "./ContributorJson";
import { Contributor } from "./Contributor";

function sortByContributions(x: ContributorJson, y: ContributorJson) {
  return  y.contributions - x.contributions;
}

export class ContributorWidgetRenderer {
    contributorsJson: ContributorJson[];

    render(targetDiv: any, contributors: ContributorJson[]): void {
        if (targetDiv != null) {
            contributors.sort(sortByContributions);
            var blockedUsers = new Array("gitter-badger");
            for(var n=0;n<contributors.length;n++){
                var contributor: Contributor;
                contributor = new Contributor(contributors[n])
                if(!contributor.isOnList(blockedUsers)) {
                    var contributorDiv = document.createElement('div');
                    var contributorHtml = '<a href=\"' + contributor.getProfileUrl() + '\" target=\"_blank\">';
                    contributorHtml += contributor.getName();
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
