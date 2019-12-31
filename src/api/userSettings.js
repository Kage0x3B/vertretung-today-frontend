// API zum herunterladen und speicher von Benutzereinstellungen

export default function (axios) {
    const get = () => {
        return new Promise(function (resolve, reject) {
            axios.get("/userSettings/get", {
                validateStatus: function (status) {
                    return (status >= 200 && status < 300) || status === 404;
                }
            }).then(function (response) {
                if (response.status === 404) {
                    resolve("{}");
                } else {
                    resolve(response.data.settingsData);
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    };

    const store = (settingsData) => axios.post("/userSettings/store", {
        settingsData
    });


    return {get, store};
};