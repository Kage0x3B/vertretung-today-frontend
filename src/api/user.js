// API fürs Einloggen, registrieren, Account mit Moodle bestätigen usw.

export default function (axios) {
    function handleAuthError(reject) {
        return function (error) {
            if (!error.response) {
                reject({
                    action: "connectionProblem"
                });
            }

            const data = error.response.data;

            if (error.response.status === 424) {
                reject({
                    action: "redirectValidation",
                    target: "",
                    message: ""
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

    // Die Anfragen sind alle sehr ähnlich, deswegen wird hier nur die URL und Parameter angegeben und in eine Helfer
    // Funktion gepackt
    const checkAuth = () => axios.get("/checkAuth");
    const register = (username, password) => postAuthRequest("/auth/register", {username, password});
    const login = (username, password) => postAuthRequest("/auth/login", {username, password});
    const validateAccountMoodle = (accountUsername, moodleUsername, moodlePassword) => postAuthRequest("/auth/validate/moodle", {
        accountUsername,
        moodleUsername,
        moodlePassword
    });

    return {
        checkAuth,
        register,
        login,
        validateAccountMoodle
    };
};