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

    const reload = (area, profession) => {
        const url = "http://localhost:10888/api/companies/" + area + "/" + profession;
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

                    companyNameElement.innerText = company.name;

                    profilesElement.appendChild(companyElement);
                });
            });
    };

    const professionSelector = () => {
        const professionElements = Array.from(document.getElementsByClassName("profession"));

        var professionClicked = (selectedProfessionElement) => () => {

            professionElements.forEach((professionElement) => {
                professionElement.classList.remove("selected");
            });
            selectedProfessionElement.classList.add("selected");
            
            const selectedArea = document.getElementById("area").innerText;
            const selectedProfession = selectedProfessionElement.getAttribute("data-profession");

            reload(selectedArea, selectedProfession);
        };

        professionElements.forEach(function (professionElement) {
            professionElement.addEventListener("click", professionClicked(professionElement));
        });
    };

    professionSelector();
})();