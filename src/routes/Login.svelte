<script>
    import BasePage from "../_components/BasePage.svelte";
    import api from "../api/api";
    import {isMobileScreen} from "../util/util";

    import { links } from "svelte-routing";
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

    $: usernameValidationMsg = usernameCustomValidationMsg || "Der Benutzername besteht aus mindestens 3 Zeichen.";
    $: passwordValidationMsg = passwordCustomValidationMsg || "Das Password besteht aus mindestens 6 Zeichen.";

    function onSubmit() {
        if (loginDisabled) {
            return;
        }

        loading = true;

        api.user.login(username, password).then(function (response) {
            loading = false;
        });
    }
</script>

<BasePage pageTitle="Login" useProminentNav>
    <div class="center page-padding">
        {#if !isMobileScreen()}
            <h2>Einloggen</h2>
        {/if}
        <form on:submit|preventDefault={onSubmit} novalidate>
            <div class="container">
                <Textfield withLeadingIcon label="Benutzername*" bind:value={username}
                           invalid={usernameInvalid && username.length > 0} input$autocomplete="username">
                    <Icon class="material-icons">person</Icon>
                </Textfield>
                <HelperText validationMsg>{usernameValidationMsg}</HelperText>
            </div>
            <div class="container">
                <Textfield withLeadingIcon type="password" label="Passwort*" bind:value={password}
                           invalid={passwordInvalid && password.length > 0}>
                    <Icon class="material-icons">lock</Icon>
                </Textfield>
                <HelperText validationMsg>{passwordValidationMsg}</HelperText>
            </div>
            <div class="container">
                <Button type="submit" variant="raised" disabled={loginDisabled || loading}>
                    <Label>Einloggen</Label>
                </Button>
            </div>
            <LinearProgress indeterminate closed={!loading}/>
            <div class="container register-info" use:links>
                <p class="mdc-typography--caption">Hast du noch keinen Account?</p>
                <Button variant="unelevated" dense href="/register">
                    <Label>Registrieren</Label>
                </Button>
            </div>
        </form>
    </div>
</BasePage>

<style>
    .center {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    .page-padding {
        padding: 0 16px;
    }

    .container {
        width: 100%;
        height: 100%;
        margin-bottom: 16px;
    }

    .container :global(.mdc-text-field) {
        display: block;
        width: 100%;
    }

    .register-info {
        margin-top: 80%;
    }

    .register-info p {
        color: #aaa;
    }
</style>