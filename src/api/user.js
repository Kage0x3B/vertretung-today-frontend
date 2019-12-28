export default function (axios) {
    function handleAuthError(reject) {
        return function (error) {
            if(!error.response) {
                reject({
                    action: "connectionProblem"
                });
            }

            const data = error.response.data;

            if (error.response.status === 424) {
                reject({
                    action: "redirectValidation",
                    target: data.payload.target,
                    message: data.payload.message
                });
            } else if (data && data.payload && data.payload.target) {
                reject({
                    action: "showMessage",
                    target: data.payload.target,
                    message: data.payload.message
                });
            } else {
                reject({
                    action: "unknownError",
                    data: data
                });
            }
        };
    }

    function postAuthRequest(url, data) {
        return new Promise(function (resolve, reject) {
            axios.post(url, data).then(function (response) {
                resolve(response);
            }).catch(handleAuthError(reject));
        });
    }

    return {
        register(username, password) {
            return postAuthRequest("/auth/register", {username, password});
        },
        login(username, password) {
            return postAuthRequest("/auth/login", {username, password});
        },
        validateAccountMoodle(accountUsername, moodleUsername, moodlePassword) {
            return postAuthRequest("/auth/validate/moodle", {accountUsername, moodleUsername, moodlePassword});
        }
    };
};