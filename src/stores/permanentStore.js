import {get, writable} from 'svelte/store';
import storage from "../storage";
import {loggedIn} from "./tempStore";

let stores = {};

let api;

function _setApi(_api) {
    api = _api;
}

function registerStore(key, value) {
    const lsKey = "store." + key;

    if (storage.has(lsKey)) {
        value = storage.get(lsKey);
    } else {
        storage.store(lsKey, value);
    }

    let store = writable(value);

    store.subscribe(value => {
        storage.store(lsKey, value);
    });

    stores[key] = store;

    return store;
}

function uploadToAccount() {
    return new Promise((resolve, reject) => {
        console.log("Uploading user settings");

        let data = {};

        for (let key in stores) {
            if (stores.hasOwnProperty(key)) {
                data[key] = get(stores[key]);
            }
        }

        const dataString = JSON.stringify(data);
        api.userSettings.store(dataString)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
}

function downloadFromAccount() {
    return new Promise((resolve, reject) => {
        console.log("Downloading user settings");

        loading.set(true);

        api.userSettings.get().then(function (dataString) {
            if(!dataString) {
                return;
            }

            try {
                const data = JSON.parse(dataString);

                for (let key in data) {
                    if (data.hasOwnProperty(key) && stores[key]) {
                        stores[key].set(data[key]);
                    }
                }

                resolve(dataString);
            } catch (e) {
                console.log("Couldn't download user settings");
                console.log(dataString);
                console.log(e);
                reject(e);
            }
        }).catch(function (error) {
            console.log(error);
            reject(error);
        }).finally(() => loading.set(false));
    });
}

loggedIn.subscribe(value => {
    if (value) {
        downloadFromAccount();
    }
});

let loading = writable(false);

export let grade = registerStore("grade", -1);
export let gradeAddition = registerStore("gradeAddition", "");
export let courses = registerStore("courses", []);

export let hideDashboardInstall = registerStore("hideDashboardInstall", false);

export default {
    _setApi, uploadToAccount, downloadFromAccount, loading
}