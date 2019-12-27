<script>
    import BasePage from "../_components/BasePage.svelte";
    import api from "../api/api";
    import {isMobileScreen} from "../util/util";

    import Textfield from "@smui/textfield";
    import Icon from '@smui/textfield/icon/index';
    import HelperText from '@smui/textfield/helper-text/index';
    import Button, {Label} from '@smui/button';
    import LinearProgress from '@smui/linear-progress';

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
    let passwordConfirmCustomValidationMsg = "";
    let passwordConfirmValidationMsg;

    $: usernameValidationMsg = usernameCustomValidationMsg || "Der Benutzername muss aus mindestens 3 Zeichen bestehen.";
    $: passwordValidationMsg = passwordCustomValidationMsg || "Das Password muss aus mindestens 6 Zeichen bestehen.";
    $: passwordConfirmValidationMsg = passwordConfirmCustomValidationMsg || "Beide Passwörter müssen gleich sein.";

    function onSubmit() {
        if (registerDisabled) {
            return;
        }

        loading = true;

        api.user.register(username, password).then(function (response) {
            loading = false;
        });
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
                <Textfield withLeadingIcon type="password" label="Passwort bestätigen*" bind:value={passwordConfirm}
                           invalid={passwordConfirmInvalid && passwordConfirm.length > 0}>
                    <Icon class="material-icons">lock</Icon>
                </Textfield>
                <HelperText validationMsg>{passwordConfirmValidationMsg}</HelperText>
            </div>
            <div class="container">
                <Button type="submit" variant="raised" disabled={registerDisabled || loading}>
                    <Label>Registrieren</Label>
                </Button>
            </div>
        </form>
    </div>
    <LinearProgress indeterminate closed={!loading}/>
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
</style>