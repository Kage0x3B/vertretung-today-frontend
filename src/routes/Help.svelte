<script>
    import {_} from "svelte-i18n";
    import BasePage from "../_components/BasePage.svelte";
</script>

<BasePage pageTitle={$_("page.help.title")} allowUnauthorized>
    <h1>{$_("page.help.title")}</h1>

    <hr>

    <p class="mdc-typography--body1">
        Wird noch geschrieben...
    </p>
</BasePage>