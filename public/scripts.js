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

    const reload = () => {        
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

                    const phoneNumbers = company.phoneNumbers.reduce((reduced, phoneNumber) => {
                        return reduced + "<a href=\"tel:" + phoneNumber + "\">" + phoneNumber + "</a>";
                    }, "");

                    companyNameElement.innerText = company.name;
                    phoneNumbersElement.innerHTML = phoneNumbers;

                    profilesElement.appendChild(companyElement);
                });
            });
    };

    const hookUp = () => {
        const professionElements = Array.from(document.getElementsByClassName("profession"));

        var professionClicked = (selectedProfessionElement) => () => {

            professionElements.forEach((professionElement) => {
                professionElement.classList.remove("selected");
            });
            selectedProfessionElement.classList.add("selected");

            reload();
        };

        const selectedAreaElement = document.getElementById("selected-area");
        selectedAreaElement.addEventListener("input", reload);

        professionElements.forEach(function (professionElement) {
            professionElement.addEventListener("click", professionClicked(professionElement));
        });
    };

    hookUp();
})();