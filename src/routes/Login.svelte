<script>
    import {_} from "svelte-i18n";
    import BasePage from "../_components/BasePage.svelte";
    import api from "../api/api";
    import util from "../util/util";
    import {loggedIn, tempUsername, tempPassword} from "../stores/tempStore";

    import {links, navigate} from "svelte-routing";
    import Textfield from "@smui/textfield";
    import Icon from '@smui/textfield/icon/index';
    import HelperText from '@smui/textfield/helper-text/index';
    import Button, {Label} from '@smui/button';
    import LinearProgress from '@smui/linear-progress';

    let username = "";
    let password = "";

    let usernameInvalid;
    let passwordInvalid;
    let loading;
    let loginDisabled;

    $: usernameInvalid = username.length < 3;
    $: passwordInvalid = password.length < 6;
    $: loginDisabled = usernameInvalid || passwordInvalid;

    let usernameCustomValidationMsg = "";
    let usernameValidationMsg;
    let passwordCustomValidationMsg = "";
    let passwordValidationMsg;
    let generalErrorMsg = "";

    $: usernameValidationMsg = usernameCustomValidationMsg || "error.invalidUsernameLength";
    $: passwordValidationMsg = passwordCustomValidationMsg || "error.invalidPasswordLength";

    function onSubmit() {
        if (loginDisabled) {
            return;
        }

        loading = true;

        api.user.login(username, password).then(function (response) {
            loading = false;

            if(api.login(response)) {
                $loggedIn = true;
                navigate("/", {replace: true});
            } else {
                generalErrorMsg = "error.validatedButLoginProblem";
            }
        }).catch(function (error) {
            loading = false;

            if (error.action === "showMessage") {
                if (error.target === "usernameField") {
                    usernameCustomValidationMsg = "error." + error.message;
                } else if (error.target === "passwordField") {
                    passwordCustomValidationMsg = "error." + error.message;
                }
            } else if (error.action === "redirectValidation") {
                $tempUsername = username;
                $tempPassword = password;

                navigate("/validate", {replace: true});
            } else if(error.action === "connectionProblem") {
                generalErrorMsg = "error.connectionProblem";
            } else {
                generalErrorMsg = "error.general";
            }
        });
    }

    function resetCustomErrorMessages() {
        usernameCustomValidationMsg = "";
        passwordCustomValidationMsg = "";
        generalErrorMsg = "";
    }
</script>

<BasePage pageTitle={$_("page.login.title")} allowUnauthorized>
    <div class="center page-padding">
        {#if !util.isMobileScreen()}
            <h2>{$_("page.login.title")}</h2>
        {/if}
        <form on:submit|preventDefault={onSubmit} novalidate>
            <div class="container">
                <Textfield withLeadingIcon label={$_("general.usernameRequired")} bind:value={username}
                           on:click={resetCustomErrorMessages}
                           invalid={usernameInvalid && username.length > 0 || usernameCustomValidationMsg}
                           input$autocomplete="username">
                    <Icon class="material-icons">person</Icon>
                </Textfield>
                <HelperText validationMsg>{$_(usernameValidationMsg)}</HelperText>
            </div>
            <div class="container">
                <Textfield withLeadingIcon type="password" label={$_("general.passwordRequired")} bind:value={password}
                           on:click={resetCustomErrorMessages}
                           invalid={passwordInvalid && password.length > 0 || passwordCustomValidationMsg}
                           input$autocomplete="current-password">
                    <Icon class="material-icons">lock</Icon>
                </Textfield>
                <HelperText validationMsg>{$_(passwordValidationMsg)}</HelperText>
            </div>
            <div class="container">
                <p class="errorMessage">{generalErrorMsg && $_(generalErrorMsg)}</p>
                <Button type="submit" variant="raised" disabled={loginDisabled || loading}>
                    <Label>{$_("page.login.loginButton")}</Label>
                </Button>
            </div>
            <div class="container register-info" use:links>
                <hr>
                <p class="mdc-typography--caption">{$_("page.login.dontHaveAnAccount")}</p>
                <Button variant="unelevated" dense href="/register">
                    <Label>{$_("page.login.registerButton")}</Label>
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
        padding: 0 16px;
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

    .register-info {
        margin-bottom: 24px;
    }

    .register-info hr {
        margin: 48px 0;
    }

    .register-info p {
        color: #aaa;
    }
</style>