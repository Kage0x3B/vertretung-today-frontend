import fileDownload from "js-file-download";

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
                fileDownload(response.data, fileName, mimeType);

                resolve(response);
            }).catch((error) => reject(error));
        });
    }

    return {
        list, download
    };
};