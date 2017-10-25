export function getJsonCallback(widget: any, url: any, callback: any) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
        callback(widget, null, xhr.response);
    } else {
        callback(widget, status, xhr.response);
    }
  };
  xhr.send();
};

export function getJsonFromUrl(url: string): any {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status !== 200) {
            throw new Error('Got error ' + status + ' for URL ' + url);
        }
    };
    xhr.send();
};
