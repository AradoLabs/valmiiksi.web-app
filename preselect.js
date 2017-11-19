(function () {

    const normalizeText = (text) => {
        if(!text) {
            return "";
        }

        return text.trim().toLowerCase().replace(/å/g, '').replace(/ä/g,"a").replace(/ö/g,"o");
    };

    const doPreselection = () => {

        const pathParts = window.location.pathname.split("/");

        if (pathParts.length > 2) {
            const area = decodeURI(pathParts[1]);
            const profession = normalizeText(decodeURI(pathParts[2]));
            const selectedAreaElement = document.getElementById("selected-area");
            const selectHvac = profession.toLowerCase() === "lvi-asentaja";
            const electricianElement  = Array.from(document.querySelectorAll('[data-profession="electrician"]'))[0];
            const hvacElement  = Array.from(document.querySelectorAll('[data-profession="hvac"]'))[0];

            if(selectHvac) {
                hvacElement.classList.add("selected");
                electricianElement.classList.remove("selected");
            }
            else {                
                electricianElement.classList.add("selected");
                hvacElement.classList.remove("selected");
            }

            selectedAreaElement.value = area;
            
            window.reloadContacts();
        }
    };

    doPreselection();
})();