const SUBSTITUTION_TYPE_ICONS = {
    "SUBSTITUTION": "error_outline",
    "CANCELLED": "close",
    "SWITCH": "autorenew",
    "MOVED": "swap_horiz",
    "ROOM_CHANGE": "settings_ethernet",
    "INDEPENDENT_WORKING": "update",
    "OTHER": "notification_important"
};

const MIME_TYPE_ICONS = {
    "application/octet-stream": "sim_card",
    "application/pdf": "picture_as_pdf",
    "text/html": "note"
};

function isMobileScreen() {
    return window.innerWidth < 768;
}

function checkAuthentication() {
    return window.innerWidth < 768;
}

let snackbarKitchen;
let installDialog;

function setKitchen(kitchen) {
    snackbarKitchen = kitchen;
}

function setInstallDialog(dialog) {
    installDialog = dialog;
}

function getKitchen() {
    return snackbarKitchen;
}

let deferredInstallPrompt;

function stashInstallPrompt(installPrompt) {
    deferredInstallPrompt = installPrompt
}

function isInstallReady() {
    if (deferredInstallPrompt) {
        return true;
    }
}

function _showInstallPrompt() {
    deferredInstallPrompt.prompt();

    deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            deferredInstallPrompt = null;
        }
    });

    return deferredInstallPrompt.userChoice;
}

function showInstallDialog() {
    installDialog.open();
}

export default {
    SUBSTITUTION_TYPE_ICONS, MIME_TYPE_ICONS, isMobileScreen, checkAuthentication,
    stashInstallPrompt, isInstallReady, _showInstallPrompt, showInstallDialog,
    setKitchen, getKitchen, setInstallDialog
}