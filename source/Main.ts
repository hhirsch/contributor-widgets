import { getJsonFromUrl } from "./Json";
import { ContributorWidget } from "./ContributorWidget";

function installGithubContributorWidget(): void {
    try {
        var widget: ContributorWidget = new ContributorWidget();
    } catch (e) {
        console.log(e.name + ': ' + e.message);
    }
}

(<any>window).installGithubContributorWidget = installGithubContributorWidget;
