
(() => {
    var errorBoxElement = false;
    var showError = (error) => {
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

    window.logError = (error) => {
        // showError(error);
    };

    window.onerror = (errorMsg, url, lineNumber) => {
        const error = 'Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber;

        window.logError(error);
    };
})();
