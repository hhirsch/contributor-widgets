import { getJsonFromUrl } from "./Json";
import { Contributor } from "./ContributorWidget";
import { ContributorWidgetConfig } from "./ContributorWidget";
import { ContributorWidget } from "./ContributorWidget";

function installGithubContributionWidget(targetDiv: string, repo: string): void {
    try {
        var config: ContributorWidgetConfig = { "targetDivId": targetDiv, "repository": repo};
        var widget: ContributorWidget = new ContributorWidget(config);
    } catch (e) {
        console.log(e.name + ': ' + e.message);
    }
}

(<any>window).installGithubContributionWidget = installGithubContributionWidget;
