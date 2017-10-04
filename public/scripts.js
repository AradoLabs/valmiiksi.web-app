const httpSend = (method, url) => {

    return new Promise((resolve, reject) => {

        const request = new XMLHttpRequest();

        const onLoaded = e => {
            if (request.readyState === 4) {
                resolve(request.responseText);
            }
        };

        const onError = e => {
            if (request.readyState === 4) {
                reject(request.statusText);
            }
        };

        request.addEventListener("load", onLoaded);
        request.addEventListener("error", onError);
        request.overrideMimeType("application/json");
        request.open(method, url, true);
        // request.setRequestHeader("Authorization", "bearer " + token);
        request.send(null);
    });
};

const httpGet = (url) => {
    return httpSend("GET", url);
};

const tradeClicked = trade => {
    const url = "http://localhost:10888/api/profiles";

    httpGet(url).then(json => {
        const profiles = JSON.parse(json);
        const profilesElement = document.getElementById("profiles");

        profilesElement.innerText = "";

        profiles.forEach(function (profile) {
            profilesElement.innerText += profile.name + ": " + profile.trade;
        });
    }).catch(error => {
        console.log(error);
    });
};

const trades = document.getElementById("trades");

trades.childNodes.forEach(function (trade) {
    trade.addEventListener("click", tradeClicked, false);
});
