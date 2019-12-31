<script>
    import {_} from "svelte-i18n";
    import BasePage from "../_components/BasePage.svelte";
    import api from "../api/api";
    import permanentStore from "../stores/permanentStore";
    import util from "../util/util";

    import {links, navigate} from "svelte-routing";
    import {Icon} from '@smui/common';
    import Button, {Label} from '@smui/button';
    import LinearProgress from '@smui/linear-progress';
    import GeneralSettings from "../_components/settings/GeneralSettings.svelte";

    // Seite mit Einstellungen. Die eigentlichen Einstellungen sind in weitere Komponenten ausgelagert wie z.B.
    // die "GeneralSettings" Komponente

    let updateGeneralSettings;
    let generalSettingsInvalid;

    let invalid = false;
    $: invalid = generalSettingsInvalid;

    function updateSettings() {
        if(invalid) {
            return;
        }

        updateGeneralSettings();

        permanentStore.uploadToAccount().then(() => {
            util.getKitchen().push({
                label: $_("page.settings.savedSnackbar")
            })
        }).catch(() => {
            util.getKitchen().push({
                label: $_("page.settings.savedLocallySnackbar")
            })
        });
    }
</script>

<BasePage pageTitle={$_("page.settings.title")}>
    {#if !util.isMobileScreen()}
        <h2>{$_("page.settings.title")}</h2>
        <hr>
    {/if}
    <GeneralSettings bind:update={updateGeneralSettings} bind:invalid={generalSettingsInvalid}/>
    <div class="update-button-container">
        <Button variant="unelevated" on:click={updateSettings} disabled={invalid}>
            <Label>{$_("page.settings.updateButton")}</Label>
        </Button>
    </div>
</BasePage>

<style>
    h2 {
    }

    hr {
        margin-bottom: 32px;
    }

    .update-button-container {
        margin-top: 32px;
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