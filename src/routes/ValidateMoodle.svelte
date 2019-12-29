<script>
    import {_} from "svelte-i18n";
    import BasePage from "../_components/BasePage.svelte";
    import api from "../api/api";
    import util from "../util/util";
    import {loggedIn, tempUsername, tempPassword} from "../stores/tempStore";

    import {navigate} from "svelte-routing";
    import Textfield from "@smui/textfield";
    import Icon from '@smui/textfield/icon/index';
    import HelperText from '@smui/textfield/helper-text/index';
    import Button, {Label} from '@smui/button';
    import LinearProgress from '@smui/linear-progress';

    let accountUsername = $tempUsername;
    let moodleUsername = "";
    let moodlePassword = "";

    let accountUsernameInvalid;
    let moodleUsernameInvalid;
    let moodlePasswordInvalid;
    let loading;
    let registerDisabled;

    $: accountUsernameInvalid = accountUsername.length < 3;
    $: moodleUsernameInvalid = moodleUsername.length < 1;
    $: moodlePasswordInvalid = moodlePassword.length < 1;
    $: registerDisabled = accountUsernameInvalid || moodleUsernameInvalid || moodlePasswordInvalid;

    let accountUsernameCustomValidationMsg = "";
    let accountUsernameValidationMsg;
    let generalErrorMsg = "";

    $: accountUsernameValidationMsg = accountUsernameCustomValidationMsg || "error.invalidUsernameLength";

    function onSubmit() {
        if (registerDisabled) {
            return;
        }

        resetCustomErrorMessages();

        loading = true;

        api.user.validateAccountMoodle(accountUsername, moodleUsername, moodlePassword).then(function () {
            api.user.login($tempUsername, $tempPassword).then(function (response) {
                loading = false;

                if(api.login(response)) {
                    $loggedIn = true;
                    navigate("/", {replace: true});
                } else {
                    generalErrorMsg = "error.validatedButLoginProblem";
                }
            }).catch(function (error) {
                loading = false;
                generalErrorMsg = "error.validatedButLoginProblem";
            });
        }).catch(function (error) {
            loading = false;

            if (error.action === "showMessage") {
                if (error.target === "accountUsernameField") {
                    accountUsernameCustomValidationMsg = "error." + error.message;
                } else if (error.target === "general") {
                    generalErrorMsg = "error." + error.message;
                }
            } else if (error.action === "connectionProblem") {
                generalErrorMsg = "error.connectionProblem";
            } else {
                generalErrorMsg = "error.general";
            }
        });
    }

    function resetCustomErrorMessages() {
        accountUsernameCustomValidationMsg = "";
        generalErrorMsg = "";
    }
</script>

<BasePage pageTitle={$_("page.validateMoodle.title")} back="/validate" allowUnauthorized>
    <div class="center page-padding">
        {#if !util.isMobileScreen()}
            <h2>{$_("page.validateMoodle.titleLong")}</h2>
        {/if}
        <form on:submit|preventDefault={onSubmit} novalidate>
            <div class="container">
                <Textfield withLeadingIcon label={$_("general.usernameRequired")} bind:value={accountUsername}
                           on:click={resetCustomErrorMessages}
                           invalid={(accountUsernameInvalid && accountUsername.length > 0) || accountUsernameCustomValidationMsg}
                           input$autocomplete="username">
                    <Icon class="material-icons">person</Icon>
                </Textfield>
                <HelperText validationMsg>{$_(accountUsernameValidationMsg)}</HelperText>
            </div>
            <div class="container">
                <Textfield withLeadingIcon label={$_("general.moodleUsernameRequired")} bind:value={moodleUsername}
                           on:click={resetCustomErrorMessages}
                           invalid={false}
                           input$autocomplete="username">
                    <Icon class="material-icons">perm_device_information</Icon>
                </Textfield>
            </div>
            <div class="container">
                <Textfield withLeadingIcon type="password" label={$_("general.moodlePasswordRequired")}
                           bind:value={moodlePassword}
                           on:click={resetCustomErrorMessages}
                           invalid={false}>
                    <Icon class="material-icons">lock</Icon>
                </Textfield>
            </div>
            <div class="container">
                <p class="errorMessage">{$_(generalErrorMsg)}</p>
                <Button type="submit" variant="raised" disabled={registerDisabled || loading}>
                    <Label>{$_("page.validateMoodle.validateButton")}</Label>
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