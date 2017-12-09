import { getJsonFromUrl } from "./Json";
import { getJsonCallback } from "./Json";
import { ContributorJson } from "./ContributorJson";
import { Contributor } from "./Contributor";
import { HtmlService } from "./HtmlService";

function sortByContributions(x: ContributorJson, y: ContributorJson) {
  return  y.contributions - x.contributions;
}

export class ContributorWidgetRenderer {
    contributorsJson: ContributorJson[];

    render(targetDiv: any, contributors: ContributorJson[]): void {
        var htmlService: HtmlService;
        var blockedUsers = new Array("gitter-badger");
        htmlService = new HtmlService();
        if (targetDiv != null) {
            contributors.sort(sortByContributions);
            for(var n=0;n<contributors.length;n++){
                var contributor: Contributor = new Contributor(contributors[n])
                if(!contributor.isOnList(blockedUsers)) {
                    var contributorDiv = document.createElement('div');
                    var contributorHtml =
                        htmlService.getAnchorHtml(contributor.getProfileUrl(), contributor.getName());
                    contributorHtml += '</br>';
                    contributorDiv.innerHTML = contributorHtml;
                    targetDiv.appendChild(contributorDiv);
                }
            }
        } else {
            console.log('Target div not found.');
        }
    }
}
