(function () {

    const normalizeText = (text) => {
        if(!text) {
            return "";
        }

        return text.replace("å", "a").replace("ä","a").replace("ö","o").trim().toLowerCase();
    };

    const doPreselection = () => {

        const pathParts = window.location.pathname.split("/");

        if (pathParts.length > 2) {
            const area = normalizeText(decodeURI(pathParts[1]));
            const profession = normalizeText(decodeURI(pathParts[2]));
            const selectedAreaElement = document.getElementById("selected-area");
            const selectHvac = profession.toLowerCase() === "lvi-asentaja";
            const electricianElement  = Array.from(document.querySelectorAll('[data-profession="electrician"]'))[0];
            const hvacElement  = Array.from(document.querySelectorAll('[data-profession="hvac"]'))[0];
            var selectedArea = area;

            if(selectHvac) {
                hvacElement.classList.add("selected");
                electricianElement.classList.remove("selected");
            }
            else {                
                electricianElement.classList.add("selected");
                hvacElement.classList.remove("selected");
            }

            const municipalities = Array.from(document.getElementById("areas").children);

            for (var i = 0; i < municipalities.length; i++) {
                const municipality = normalizeText(municipalities[i].value);

                if(municipality === selectedArea) {
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