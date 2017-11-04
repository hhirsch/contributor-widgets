import { getJsonFromUrl } from "./Json";
import { getJsonCallback } from "./Json";
import { Contributor } from "./Contributor";
import { ContributorWidgetRenderer } from "./ContributorWidgetRenderer";

export class ContributorWidget {
    configJson: any;
    contributorsJson: Contributor[];
    renderer: ContributorWidgetRenderer;

    constructor() {
        this.renderer = new ContributorWidgetRenderer(); 
        var widgetDivs = document.getElementsByClassName("gh-contrib-widget");
        for(var i = 0; i < widgetDivs.length; i++) {
            var targetDiv = widgetDivs.item(i);
            this.loadData(targetDiv);
        }
    }

    loadData(targetDiv: any): void {
        var jsonUrl: string =
            'https://api.github.com/repos/' + targetDiv.dataset.repository + '/contributors';
        var dataHandler = function(renderer: ContributorWidgetRenderer, error: string, data: Contributor[]){
            if (error !== null) {
                console.log('Could not load data: ' + error);
            } else {
                renderer.render(targetDiv, data);
            }
        }
        getJsonCallback(this.renderer, jsonUrl, dataHandler);
    }
}
