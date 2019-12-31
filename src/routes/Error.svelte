<script>
    import {_} from "svelte-i18n";
    import BasePage from "../_components/BasePage.svelte";
    import { links } from "svelte-routing";
    import Button, {Label, Icon} from '@smui/button';

    // Diese Route wird immer geladen, wenn die Seite in der URL nicht gefunden werden konnte, also eine
    // Art 404-Seite. (Obwohl es eigentlich bei einer SPA keine 404-Seiten gibt, alle Anfragen werden direkt von
    // der index.html Datei bearbeitet)
</script>

<BasePage pageTitle={$_("page.error.title")} allowUnauthorized>
    <div class="center page-padding">
        <h1>{$_("page.error.title")}</h1>

        <p class="mdc-typography--body1">
            {$_("page.error.description")}
        </p>
        <hr>
        <div use:links>
            <Button variant="unelevated" href="/" replace>
                <Icon class="material-icons">arrow_back</Icon>
                <Label>{$_("general.back")}</Label>
            </Button>
        </div>
    </div>
</BasePage>

<style>
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .page-padding {
        padding: 16px;
    }
</style>