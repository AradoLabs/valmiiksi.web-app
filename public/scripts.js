"use strict";

(function () {
    var httpSend = function httpSend(method, url) {

        return new Promise(function (resolve, reject) {

            var request = new XMLHttpRequest();

            var onLoaded = function onLoaded(e) {
                if (request.readyState === 4) {
                    resolve(request);
                }
            };

            var onError = function onError(e) {
                if (request.readyState === 4) {
                    reject(request);
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

    var httpGet = function httpGet(url) {
        return httpSend("GET", url);
    };

    var reloadContacts = function reloadContacts() {
        var selectedArea = document.getElementById("selected-area").value;
        var selectedProfessionElement = document.querySelector(".profession.selected");

        if (!selectedArea || !selectedProfessionElement) {
            return;
        }

        var profession = selectedProfessionElement.getAttribute("data-profession");
        var url = "https://agent.valmiiksi.fi/api/companies/" + selectedArea + "/" + profession;
        var template = document.getElementById("company-template");

        httpGet(url).then(function (request) {
            var companies = JSON.parse(request.responseText);
            var profilesElement = document.getElementById("profiles");

            profilesElement.innerHTML = "";

            companies.forEach(function (company) {
                var clonedTemplate = document.importNode(template.content, true);
                var companyElement = clonedTemplate.querySelector(".company");
                var companyNameElement = companyElement.querySelector(".name");
                var phoneNumbersElement = companyElement.querySelector(".phoneNumbers");
                var websitesElement = companyElement.querySelector(".websites");
                var protocolRegex = new RegExp("^http(s)?://");

                var phoneNumbers = company.phoneNumbers.reduce(function (reduced, phoneNumber) {
                    return reduced + "<a href=\"tel:" + phoneNumber + "\">" + phoneNumber + "</a>";
                }, "");

                var websites = company.websites.reduce(function (reduced, website) {
                    try {
                        var address = website.trim();
                        var prefix = protocolRegex.test(address) ? "" : "http://";
                        var _url = new URL(prefix + address).toString();

                        return reduced + "<a target=\"_blank\" href=\"" + _url + "\">" + address + "</a>";
                    } catch (exception) {
                        return reduced;
                    }
                }, "");

                companyNameElement.innerText = company.name;
                phoneNumbersElement.innerHTML = phoneNumbers;
                websitesElement.innerHTML = websites;

                profilesElement.appendChild(companyElement);
            });
        });
    };

    var startup = function startup() {

        var pathParts = window.location.pathname.split();

        if (pathParts.length === 2) {
            var area = pathParts[0];
            var profession = pathParts[1];
        }

        var professionElements = Array.from(document.getElementsByClassName("profession"));

        var professionClicked = function professionClicked(selectedProfessionElement) {
            return function () {

                professionElements.forEach(function (professionElement) {
                    professionElement.classList.remove("selected");
                });
                selectedProfessionElement.classList.add("selected");

                reloadContacts();
            };
        };

        var selectedAreaElement = document.getElementById("selected-area");
        selectedAreaElement.addEventListener("input", reloadContacts);

        professionElements.forEach(function (professionElement) {
            professionElement.addEventListener("click", professionClicked(professionElement));
        });
    };

    startup();

    window.reloadContacts = reloadContacts;
})();
"use strict";

(function () {

    var normalizeText = function normalizeText(text) {
        if (!text) {
            return "";
        }

        return text.replace("å", "a").replace("ä", "a").replace("ö", "o").trim().toLowerCase();
    };

    var doPreselection = function doPreselection() {

        var pathParts = window.location.pathname.split("/");

        if (pathParts.length > 2) {
            var area = normalizeText(decodeURI(pathParts[1]));
            var profession = normalizeText(decodeURI(pathParts[2]));
            var selectedAreaElement = document.getElementById("selected-area");
            var selectHvac = profession.toLowerCase() === "lvi-asentaja";
            var electricianElement = Array.from(document.querySelectorAll('[data-profession="electrician"]'))[0];
            var hvacElement = Array.from(document.querySelectorAll('[data-profession="hvac"]'))[0];
            var selectedArea = area;

            if (selectHvac) {
                hvacElement.classList.add("selected");
                electricianElement.classList.remove("selected");
            } else {
                electricianElement.classList.add("selected");
                hvacElement.classList.remove("selected");
            }

            var municipalities = Array.from(document.getElementById("areas").children);

            for (var i = 0; i < municipalities.length; i++) {
                var municipality = normalizeText(municipalities[i].value);

                if (municipality === selectedArea) {
                    selectedArea = municipality;
                    break;
                }
            }

            selectedAreaElement.value = area;
            window.reloadContacts();
        }
    };

    doPreselection();
})();

