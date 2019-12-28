<script>
    import BasePage from "../_components/BasePage.svelte";
    import api from "../api/api";
    import {isMobileScreen} from "../util/util";

    import {navigate} from "svelte-routing";
    import Textfield from "@smui/textfield";
    import Icon from '@smui/textfield/icon/index';
    import HelperText from '@smui/textfield/helper-text/index';
    import Button, {Label} from '@smui/button';
    import LinearProgress from '@smui/linear-progress';

    const errorMessages = {
        invalidUsernameLength: "Der Benutzername muss aus mindestens 3 Zeichen bestehen.",
        invalidPasswordLength: "Das Password muss aus mindestens 6 Zeichen bestehen.",
        identicalPasswordsRequired: "Beide Passwörter müssen gleich sein.",
        usernameTaken: "Benutzername ist bereits vergeben.",
        general: "Ein Problem ist aufgetreten.",
        connectionProblem: "Es konnte keine Verbindung zum Server aufgebaut werden."
    };

    let username = "";
    let password = "";
    let passwordConfirm = "";

    let usernameInvalid;
    let passwordInvalid;
    let passwordConfirmInvalid;
    let loading;
    let registerDisabled;

    $: usernameInvalid = username.length < 3;
    $: passwordInvalid = password.length < 6;
    $: passwordConfirmInvalid = passwordConfirm !== password;
    $: registerDisabled = usernameInvalid || passwordInvalid || passwordConfirmInvalid;

    let usernameCustomValidationMsg = "";
    let usernameValidationMsg;
    let passwordCustomValidationMsg = "";
    let passwordValidationMsg;
    const passwordConfirmValidationMsg = errorMessages.identicalPasswordsRequired;
    let generalErrorMsg = "";

    $: usernameValidationMsg = usernameCustomValidationMsg || errorMessages.invalidUsernameLength;
    $: passwordValidationMsg = passwordCustomValidationMsg || errorMessages.invalidPasswordLength;

    function onSubmit() {
        if (registerDisabled) {
            return;
        }

        resetCustomErrorMessages();

        loading = true;

        api.user.register(username, password).then(function () {
            loading = false;
            //TODO: Create Moodle validation page
            navigate("/login", {replace: true});
        }).catch(function (error) {
            loading = false;

            if (error.action === "showMessage") {
                if (error.target === "usernameField") {
                    usernameCustomValidationMsg = errorMessages[error.message];
                } else if (error.target === "passwordField") {
                    passwordCustomValidationMsg = errorMessages[error.message];
                }
            } else if (error.action === "connectionProblem") {
                generalErrorMsg = errorMessages.connectionProblem;
            } else {
                generalErrorMsg = errorMessages.general;
            }
        });
    }

    function resetCustomErrorMessages() {
        usernameCustomValidationMsg = "";
        passwordCustomValidationMsg = "";
        generalErrorMsg = "";
    }
</script>

<BasePage pageTitle="Registrieren" useProminentNav>
    <div class="center page-padding">
        {#if !isMobileScreen()}
            <h2>Registrieren</h2>
        {/if}
        <form on:submit|preventDefault={onSubmit} novalidate>
            <div class="container">
                <Textfield withLeadingIcon label="Benutzername*" bind:value={username}
                           on:click={resetCustomErrorMessages}
                           invalid={(usernameInvalid && username.length > 0) || usernameCustomValidationMsg}
                           input$autocomplete="username">
                    <Icon class="material-icons">person</Icon>
                </Textfield>
                <HelperText validationMsg>{usernameValidationMsg}</HelperText>
            </div>
            <div class="container">
                <Textfield withLeadingIcon type="password" label="Passwort*" bind:value={password}
                           on:click={resetCustomErrorMessages}
                           invalid={(passwordInvalid && password.length > 0) || passwordCustomValidationMsg}>
                    <Icon class="material-icons">lock</Icon>
                </Textfield>
                <HelperText validationMsg>{passwordValidationMsg}</HelperText>
            </div>
            <div class="container">
                <Textfield withLeadingIcon type="password" label="Passwort bestätigen*" bind:value={passwordConfirm}
                           on:click={resetCustomErrorMessages}
                           invalid={passwordConfirmInvalid && passwordConfirm.length > 0}>
                    <Icon class="material-icons">lock</Icon>
                </Textfield>
                <HelperText validationMsg>{passwordConfirmValidationMsg}</HelperText>
            </div>
            <div class="container">
                <p class="errorMessage">{generalErrorMsg}</p>
                <Button type="submit" variant="raised" disabled={registerDisabled || loading}>
                    <Label>Registrieren</Label>
                </Button>
            </div>
        </form>
    </div>
    <LinearProgress indeterminate closed={!loading}/>
</BasePage>

<style>
    h2 {
        margin-bottom: 32px;
    }

    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .page-padding {
        padding: 0 16px 16px;
    }

    .container {
        width: 100%;
    }

    .container :global(.mdc-text-field) {
        display: block;
        width: 100%;
    }

    .errorMessage {
        color: #b00020;
        font-family: Roboto, sans-serif;
        font-size: .75rem;
        line-height: 1.25rem;
        font-weight: 400;
        letter-spacing: .03333em;
        transition: opacity .25s cubic-bezier(.4, 0, .2, 1), transform .25s;
        opacity: 0;
        transform: scaleY(0);
    }

    .errorMessage:not(:empty) {
        opacity: 1;
        transform: scaleY(1);
    }
</style>