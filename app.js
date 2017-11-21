(function () {

    const normalizeText = (text) => {
        if (!text) {
            return "";
        }

        return text.trim().toLowerCase().replace(/å/g, '').replace(/ä/g, "a").replace(/ö/g, "o");
    };

    const httpSend = (method, url) => {

        return new Promise((resolve, reject) => {

            const request = new XMLHttpRequest();

            const onLoaded = e => {
                if (request.readyState === 4) {
                    resolve(request);
                }
            };

            const onError = e => {
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

    const httpGet = (url) => {
        return httpSend("GET", url);
    };

    const createCompanyElement = (company) => {
        // <div class="company">
        //     <div class="name"></div>
        //     <div class="websites"></div>
        //     <div class="phone-numbers"></div>
        // </div>
        const companyElement = document.createElement("div");
        const nameElement = document.createElement("div");
        const websitesElement = document.createElement("div");
        const phoneNumbersElement = document.createElement("div");

        companyElement.classList.add("company");
        nameElement.classList.add("name");
        websitesElement.classList.add("websites");
        phoneNumbersElement.classList.add("phone-numbers");

        const protocolRegex = new RegExp("^http(s)?://");

        const phoneNumbers = company.phoneNumbers.reduce((reduced, phoneNumber) => {
            return reduced + "<a href=\"tel:" + phoneNumber + "\">" + phoneNumber + "</a>";
        }, "");

        const websites = company.websites.reduce((reduced, website) => {
            try {
                const address = website.trim();
                const prefix = protocolRegex.test(address) ? "" : "http://";
                const url = new URL(prefix + address).toString();

                return reduced + "<a target=\"_blank\" href=\"" + url + "\">" + address + "</a>";
            }
            catch (exception) {
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

    const reloadContacts = () => {
        const selectedArea = document.getElementById("selected-area").value;
        const selectedProfessionElement = document.querySelector(".profession.selected");

        if (!selectedArea || !selectedProfessionElement) {
            return;
        }

        const profession = selectedProfessionElement.getAttribute("data-profession");
        const area = normalizeText(selectedArea);
        const url = "https://agent.valmiiksi.fi/api/companies/" + area + "/" + profession;

        httpGet(url)
            .then(request => {
                const companies = JSON.parse(request.responseText);
                const profilesElement = document.getElementById("profiles");

                profilesElement.innerHTML = "";

                companies.forEach(function (company) {
                    const companyElement = createCompanyElement(company);

                    profilesElement.appendChild(companyElement);
                });
            })
            .catch(error => window.logError(error));
    };

    const startup = () => {

        const pathParts = window.location.pathname.split();

        if (pathParts.length === 2) {
            const area = pathParts[0];
            const profession = pathParts[1];
        }

        const professionElements = document.getElementsByClassName("profession");

        var professionClicked = (selectedProfessionElement) => () => {

            for (var i = 0; i < professionElements.length; i++) {
                professionElements[i].classList.remove("selected");                
            }

            selectedProfessionElement.classList.add("selected");

            reloadContacts();
        };

        const selectedAreaElement = document.getElementById("selected-area");
        selectedAreaElement.addEventListener("input", reloadContacts);

        for (var i = 0; i < professionElements.length; i++) {
            professionElements[i].addEventListener("click", professionClicked(professionElements[i]));              
        }
    };

    startup();

    window.reloadContacts = reloadContacts;
})();