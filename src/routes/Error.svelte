<script>
    import BasePage from "../_components/BasePage.svelte";
    import { links } from "svelte-routing";
    import Button, {Label, Icon} from '@smui/button';
</script>

<BasePage pageTitle="Hilfe" useProminentNav="">
    <div class="center page-padding">
        <h1>Nicht gefunden</h1>

        <p class="mdc-typography--body1">
            Die Seite konnte nicht gefunden werden
        </p>
        <hr>
        <div use:links>
            <Button variant="unelevated" href="/" replace>
                <Icon class="material-icons">arrow_back</Icon>
                <Label>Zurück</Label>
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