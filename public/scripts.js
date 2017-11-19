'use strict';

(function () {
    var errorBoxElement = false;
    var showError = function showError(error) {
        if (!errorBoxElement) {
            errorBoxElement = document.createElement('div');
            errorBoxElement.style.position = 'absolute';
            errorBoxElement.style.top = '0';
            errorBoxElement.style.bottom = '0';
            errorBoxElement.style.left = '0';
            errorBoxElement.style.right = '0';
            errorBoxElement.style.background = 'rgba(255, 0, 0, 0.7)';
            errorBoxElement.style.zIndex = 1000000;
            errorBoxElement.style.color = '#fff';
            errorBoxElement.style.padding = '10px';
            document.body.appendChild(errorBoxElement);
        }
        var errorLine = document.createElement('div');
        errorLine.innerHTML = error;
        errorBoxElement.appendChild(errorLine);
    };

    window.onerror = function (errorMsg, url, lineNumber) {
        showError('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
    };

    window.logError = function (error) {
        return showError(error);
    };
})();
"use strict";

(function () {
    var municipalities = ["Alajärvi", "Alavieska", "Alavus", "Asikkala", "Askola", "Aura", "Akaa", "Brändö", "Eckerö", "Enonkoski", "Enontekiö", "Espoo", "Eura", "Eurajoki", "Evijärvi", "Finström", "Forssa", "Föglö", "Geta", "Haapajärvi", "Haapavesi", "Hailuoto", "Halsua", "Hamina", "Hammarland", "Hankasalmi", "Hanko", "Harjavalta", "Hartola", "Hattula", "Hausjärvi", "Heinävesi", "Helsinki", "Vantaa", "Hirvensalmi", "Hollola", "Honkajoki", "Huittinen", "Humppila", "Hyrynsalmi", "Hyvinkää", "Hämeenkyrö", "Hämeenlinna", "Heinola", "Ii", "Iisalmi", "Iitti", "Ikaalinen", "Ilmajoki", "Ilomantsi", "Inari", "Inkoo", "Isojoki", "Isokyrö", "Imatra", "Janakkala", "Joensuu", "Jokioinen", "Jomala", "Joroinen", "Joutsa", "Juuka", "Juupajoki", "Juva", "Jyväskylä", "Jämijärvi", "Jämsä", "Järvenpää", "Kaarina", "Kaavi", "Kajaani", "Kalajoki", "Kangasala", "Kangasniemi", "Kankaanpää", "Kannonkoski", "Kannus", "Karijoki", "Karkkila", "Karstula", "Karvia", "Kaskinen", "Kauhajoki", "Kauhava", "Kauniainen", "Kaustinen", "Keitele", "Kemi", "Keminmaa", "Kempele", "Kerava", "Keuruu", "Kihniö", "Kinnula", "Kirkkonummi", "Kitee", "Kittilä", "Kiuruvesi", "Kivijärvi", "Kokemäki", "Kokkola", "Kolari", "Konnevesi", "Kontiolahti", "Korsnäs", "Koski Tl", "Kotka", "Kouvola", "Kristiinankaupunki", "Kruunupyy", "Kuhmo", "Kuhmoinen", "Kumlinge", "Kuopio", "Kuortane", "Kurikka", "Kustavi", "Kuusamo", "Outokumpu", "Kyyjärvi", "Kärkölä", "Kärsämäki", "Kökar", "Kemijärvi", "Kemiönsaari", "Lahti", "Laihia", "Laitila", "Lapinlahti", "Lappajärvi", "Lappeenranta", "Lapinjärvi", "Lapua", "Laukaa", "Lemi", "Lemland", "Lempäälä", "Leppävirta", "Lestijärvi", "Lieksa", "Lieto", "Liminka", "Liperi", "Loimaa", "Loppi", "Loviisa", "Luhanka", "Lumijoki", "Lumparland", "Luoto", "Luumäki", "Lohja", "Parainen", "Maalahti", "Maarianhamina", "Marttila", "Masku", "Merijärvi", "Merikarvia", "Miehikkälä", "Mikkeli", "Muhos", "Multia", "Muonio", "Mustasaari", "Muurame", "Mynämäki", "Myrskylä", "Mäntsälä", "Mäntyharju", "Mänttä-Vilppula", "Naantali", "Nakkila", "Nivala", "Nokia", "Nousiainen", "Nurmes", "Nurmijärvi", "Närpiö", "Orimattila", "Oripää", "Orivesi", "Oulainen", "Oulu", "Padasjoki", "Paimio", "Paltamo", "Parikkala", "Parkano", "Pelkosenniemi", "Perho", "Pertunmaa", "Petäjävesi", "Pieksämäki", "Pielavesi", "Pietarsaari", "Pedersören kunta", "Pihtipudas", "Pirkkala", "Polvijärvi", "Pomarkku", "Pori", "Pornainen", "Posio", "Pudasjärvi", "Pukkila", "Punkalaidun", "Puolanka", "Puumala", "Pyhtää", "Pyhäjoki", "Pyhäjärvi", "Pyhäntä", "Pyhäranta", "Pälkäne", "Pöytyä", "Porvoo", "Raahe", "Raisio", "Rantasalmi", "Ranua", "Rauma", "Rautalampi", "Rautavaara", "Rautjärvi", "Reisjärvi", "Riihimäki", "Ristijärvi", "Rovaniemi", "Ruokolahti", "Ruovesi", "Rusko", "Rääkkylä", "Raasepori", "Saarijärvi", "Salla", "Salo", "Saltvik", "Sauvo", "Savitaipale", "Savonlinna", "Savukoski", "Seinäjoki", "Sievi", "Siikainen", "Siikajoki", "Siilinjärvi", "Simo", "Sipoo", "Siuntio", "Sodankylä", "Soini", "Somero", "Sonkajärvi", "Sotkamo", "Sottunga", "Sulkava", "Sund", "Suomussalmi", "Suonenjoki", "Sysmä", "Säkylä", "Vaala", "Sastamala", "Siikalatva", "Taipalsaari", "Taivalkoski", "Taivassalo", "Tammela", "Tampere", "Tervo", "Tervola", "Teuva", "Tohmajärvi", "Toholampi", "Toivakka", "Tornio", "Turku", "Pello", "Tuusniemi", "Tuusula", "Tyrnävä", "Ulvila", "Urjala", "Utajärvi", "Utsjoki", "Uurainen", "Uusikaarlepyy", "Uusikaupunki", "Vaasa", "Valkeakoski", "Valtimo", "Varkaus", "Vehmaa", "Vesanto", "Vesilahti", "Veteli", "Vieremä", "Vihti", "Viitasaari", "Vimpeli", "Virolahti", "Virrat", "Vårdö", "Vöyri", "Ylitornio", "Ylivieska", "Ylöjärvi", "Ypäjä", "Ähtäri", "Äänekoski"];

    var areaListElement = document.getElementById("areas");

    municipalities.forEach(function (municipality) {
        var optionElement = document.createElement("option");

        optionElement.value = municipality;

        areaListElement.appendChild(optionElement);
    });
})();
"use strict";

(function () {

    var normalizeText = function normalizeText(text) {
        if (!text) {
            return "";
        }

        return text.trim().toLowerCase().replace(/å/g, '').replace(/ä/g, "a").replace(/ö/g, "o");
    };

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

    var createCompanyElement = function createCompanyElement(company) {
        // <div class="company">
        //     <div class="name"></div>
        //     <div class="websites"></div>
        //     <div class="phone-numbers"></div>
        // </div>
        var companyElement = document.createElement("div");
        var nameElement = document.createElement("div");
        var websitesElement = document.createElement("div");
        var phoneNumbersElement = document.createElement("div");

        companyElement.classList.add("company");
        nameElement.classList.add("name");
        websitesElement.classList.add("websites");
        phoneNumbersElement.classList.add("phone-numbers");

        var protocolRegex = new RegExp("^http(s)?://");

        var phoneNumbers = company.phoneNumbers.reduce(function (reduced, phoneNumber) {
            return reduced + "<a href=\"tel:" + phoneNumber + "\">" + phoneNumber + "</a>";
        }, "");

        var websites = company.websites.reduce(function (reduced, website) {
            try {
                var address = website.trim();
                var prefix = protocolRegex.test(address) ? "" : "http://";
                var url = new URL(prefix + address).toString();

                return reduced + "<a target=\"_blank\" href=\"" + url + "\">" + address + "</a>";
            } catch (exception) {
                return reduced;
            }
        }, "");

        nameElement.innerText = company.name;
        phoneNumbersElement.innerHTML = phoneNumbers;
        websitesElement.innerHTML = websites;

        companyElement.appendChild(nameElement);
        companyElement.appendChild(websitesElement);
        companyElement.appendChild(phoneNumbersElement);

        return companyElement;
    };

    var reloadContacts = function reloadContacts() {
        var selectedArea = document.getElementById("selected-area").value;
        var selectedProfessionElement = document.querySelector(".profession.selected");

        if (!selectedArea || !selectedProfessionElement) {
            return;
        }

        var profession = selectedProfessionElement.getAttribute("data-profession");
        var area = normalizeText(selectedArea);
        var url = "https://agent.valmiiksi.fi/api/companies/" + area + "/" + profession;

        httpGet(url).then(function (request) {
            var companies = JSON.parse(request.responseText);
            var profilesElement = document.getElementById("profiles");

            profilesElement.innerHTML = "";

            companies.forEach(function (company) {
                var companyElement = createCompanyElement(company);

                profilesElement.appendChild(companyElement);
            });
        }).catch(function (error) {
            return window.logError(error);
        });
    };

    var startup = function startup() {

        var pathParts = window.location.pathname.split();

        if (pathParts.length === 2) {
            var area = pathParts[0];
            var profession = pathParts[1];
        }

        var professionElements = document.getElementsByClassName("profession");

        var professionClicked = function professionClicked(selectedProfessionElement) {
            return function () {

                for (var i = 0; i < professionElements.length; i++) {
                    professionElements[i].classList.remove("selected");
                }

                selectedProfessionElement.classList.add("selected");

                reloadContacts();
            };
        };

        var selectedAreaElement = document.getElementById("selected-area");
        selectedAreaElement.addEventListener("input", reloadContacts);

        for (var i = 0; i < professionElements.length; i++) {
            professionElements[i].addEventListener("click", professionClicked(professionElements[i]));
        }
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

        return text.trim().toLowerCase().replace(/å/g, '').replace(/ä/g, "a").replace(/ö/g, "o");
    };

    var doPreselection = function doPreselection() {

        var pathParts = window.location.pathname.split("/");

        if (pathParts.length > 2) {
            var area = decodeURI(pathParts[1]);
            var profession = normalizeText(decodeURI(pathParts[2]));
            var selectedAreaElement = document.getElementById("selected-area");
            var selectHvac = profession.toLowerCase() === "lvi-asentaja";
            var electricianElement = document.querySelectorAll('[data-profession="electrician"]')[0];
            var hvacElement = document.querySelectorAll('[data-profession="hvac"]')[0];

            if (selectHvac) {
                hvacElement.classList.add("selected");
                electricianElement.classList.remove("selected");
            } else {
                electricianElement.classList.add("selected");
                hvacElement.classList.remove("selected");
            }

            selectedAreaElement.value = area;

            window.reloadContacts();
        }
    };

    doPreselection();
})();

