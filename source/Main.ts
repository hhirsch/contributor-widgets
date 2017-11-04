import { getJsonFromUrl } from "./Json";
import { Contributor } from "./ContributorWidget";
import { ContributorWidget } from "./ContributorWidget";

function installGithubContributionWidget(): void {
    try {
        var widget: ContributorWidget = new ContributorWidget();
    } catch (e) {
        console.log(e.name + ': ' + e.message);
    }
}

(<any>window).installGithubContributionWidget = installGithubContributionWidget;
