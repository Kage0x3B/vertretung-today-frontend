<script>
    import {_} from "svelte-i18n";
    import BasePage from "../_components/BasePage.svelte";
    import {tempUsername} from "../stores/tempStore";
    import util from "../util/util";
    import {links} from "svelte-routing";
    import Button, {Label} from '@smui/button';

    const mailAddress = "validate-me@vertretungtoday.de";
    const subject = encodeURI($_("validateEmailTemplate.subject"));
    const body = encodeURI($_("validateEmailTemplate.body", {
        values: {username: $tempUsername}
    }));
    const mailtoLink = "mailto:" + mailAddress + "?subject=" + subject + "&body=" + body;
</script>

<BasePage pageTitle={$_("page.validateInfo.title")} allowUnauthorized>
    <div class="page-padding">
        {#if !util.isMobileScreen()}
            <div class="center">
                <h1>{$_("page.validateInfo.title")}</h1>
            </div>
            <hr>
        {/if}

        <p class="mdc-typography--body1">
            {$_("page.validateInfo.generalInfo.1")}
            {$_("page.validateInfo.generalInfo.2", {values: {schoolName: $_("schoolName")}})}
        </p>
        <p class="mdc-typography--body1">
            {$_("page.validateInfo.generalInfo.3")}
        </p>
        <ul>
            <li>
                <h4>{$_("page.validateInfo.option.1.title")}</h4>
                <p>{$_("page.validateInfo.option.1.description.1")}</p>
                <p>{$_("page.validateInfo.option.1.description.2")}</p>
                <p>{$_("page.validateInfo.option.1.description.3")}</p>
                <div use:links>
                    <Button variant="raised" href="/validate/moodle">
                        <Label>{$_("page.validateInfo.option.1.button")}</Label>
                    </Button>
                </div>
            </li>
            <li>
                <h4>{$_("page.validateInfo.option.2.title")}</h4>
                <p>
                    {$_("page.validateInfo.option.2.description.1")}
                    {$_("page.validateInfo.option.2.description.2")}
                </p>
                <p>{$_("page.validateInfo.option.2.description.3")}</p>
                <Button variant="outlined" href={mailtoLink}>
                    <Label>{$_("page.validateInfo.option.2.button")}</Label>
                </Button>
            </li>
        </ul>
    </div>
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
</style>