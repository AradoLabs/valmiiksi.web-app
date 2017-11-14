(function () {
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

    const reloadContacts = () => {        
        const selectedArea = document.getElementById("selected-area").value;
        const selectedProfessionElement = document.querySelector(".profession.selected");

        if(!selectedArea || !selectedProfessionElement) {
            return;
        }

        const profession = selectedProfessionElement.getAttribute("data-profession");
        const url = "https://agent.valmiiksi.fi/api/companies/" + selectedArea + "/" + profession;
        const template = document.getElementById("company-template");

        httpGet(url)
            .then(request => {
                const companies = JSON.parse(request.responseText);
                const profilesElement = document.getElementById("profiles");

                profilesElement.innerHTML = "";

                companies.forEach(function (company) {
                    const clonedTemplate = document.importNode(template.content, true);
                    const companyElement = clonedTemplate.querySelector(".company");
                    const companyNameElement = companyElement.querySelector(".name");
                    const phoneNumbersElement = companyElement.querySelector(".phoneNumbers");
                    const websitesElement = companyElement.querySelector(".websites");
                    const protocolRegex = new RegExp("^http(s)?://");

                    const phoneNumbers = company.phoneNumbers.reduce((reduced, phoneNumber) => {
                        return reduced + "<a href=\"tel:" + phoneNumber + "\">" + phoneNumber + "</a>";
                    }, "");
                    
                    const websites = company.websites.reduce((reduced, website) => {
                        try
                        {
                            const address = website.trim();
                            const prefix = protocolRegex.test(address) ? "" : "http://";
                            const url = new URL(prefix + address).toString();

                            return reduced + "<a target=\"_blank\" href=\"" + url + "\">" + address + "</a>";
                        }
                        catch(exception)
                        {
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

    const startup = () => {

        const pathParts = window.location.pathname.split();

        if(pathParts.length === 2) {
            const area = pathParts[0];
            const profession = pathParts[1];
        }

        const professionElements = Array.from(document.getElementsByClassName("profession"));

        var professionClicked = (selectedProfessionElement) => () => {

            professionElements.forEach((professionElement) => {
                professionElement.classList.remove("selected");
            });
            selectedProfessionElement.classList.add("selected");

            reloadContacts();
        };

        const selectedAreaElement = document.getElementById("selected-area");
        selectedAreaElement.addEventListener("input", reloadContacts);

        professionElements.forEach(function (professionElement) {
            professionElement.addEventListener("click", professionClicked(professionElement));
        });
    };

    startup();

    window.reloadContacts = reloadContacts;
})();