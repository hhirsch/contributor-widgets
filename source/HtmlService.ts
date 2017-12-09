export class HtmlService {
    getAnchorHtml(url: string, content: string): string {
        var html = '<a href=\"' + url + '\" target=\"_blank\">';
        html += content;
        html += '</a>';

        return html;
    }
}
