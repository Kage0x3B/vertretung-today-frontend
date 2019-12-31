import fileDownload from "js-file-download";

// API für die Dateiauflistung und Datei herunterladen
export default function (axios) {
    const list = () => axios.get("/file/list");

    function download(resourceId, fileName, mimeType) {
        return new Promise((resolve, reject) => {
            axios.get("/file/get/" + resourceId, {
                params: {
                    download: true
                },
                responseType: 'blob'
            }).then(function (response) {
                // Das Herunterladen benutzt die js-file-download Bibliothek, um den nativen Download
                // Dialog/Funktionalität des Browsers zu benutzen, obwohl es kein direkter Download ist,
                // also keine direkte URL aufgerufen wird mit einem Content-Disposition Header,
                // sondern die Daten bereits heruntergeladen sind und in einem Blob liegen
                fileDownload(response.data, fileName, mimeType);

                resolve(response);
            }).catch((error) => reject(error));
        });
    }

    return {
        list, download
    };
};