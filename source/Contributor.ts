import { ContributorJson } from "./ContributorJson";

export class Contributor {
    contributions:number;
    profileUrl: string;
    name: string;

    constructor(contributorJson: ContributorJson) {
        this.name = contributorJson.login;
        this.profileUrl = contributorJson.html_url;
        this.contributions = contributorJson.contributions;
    }

    isOnList(userList: string[]): boolean {
        if (userList.indexOf(this.name) == -1) {
            return false;
        }

        return true;
    }

    getName(): string{
        return this.name;
    }

    getProfileUrl(): string{
        return this.profileUrl;
    }

    getContributions(): number{
        return this.contributions;
    }
}
