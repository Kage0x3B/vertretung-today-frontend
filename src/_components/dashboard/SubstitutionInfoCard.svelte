<script>
    import {_} from "svelte-i18n";
    import util from "../../util/util";
    import Card, {Content, Actions, ActionButtons, ActionIcons} from '@smui/card';
    import Button, {Label} from '@smui/button';
    import {Icon} from '@smui/common';
    import IconButton from '@smui/icon-button';
    import {navigate} from "svelte-routing";

    // Dashboard Karte, die die Zusammenfassung der Vertretungspläne anzeigt
    // mit Nachricht des Tages und Anzahl der Vertretungen

    export let date = "today";
    export let summaryData = {
        amountToday: -1,
        amountNext: -1,
        nextDate: "",
        motd: {
            today: {
                date: "",
                message: ""
            },
            next: {
                date: "",
                message: ""
            }
        }
    };

    const today = date === "today";
    const entryAmount = today ? summaryData.amountToday : summaryData.amountNext;
    const motd = summaryData.motd[date] ? summaryData.motd[date].message : "";
    const day = today ? new Date() : new Date(summaryData.nextDate);

    const isVisible = entryAmount > 0 || date === "today";
</script>

{#if isVisible}
    <Card class="dashboard-card">
        <Content class="mdc-typography--body2">
            <h2 class="mdc-typography--headline5">
                <Icon class="dashboard-title-icon material-icons">info</Icon>
                {$_("dashboardCard.summary.title." + date, {values: {day}})}
            </h2>
            <hr>
            {#if motd}
                <p class="mdc-typography--caption caption-gray">
                    {$_("dashboardCard.summary.motd")}
                </p>
                <div class="motd">{@html motd}</div>
            {:else}
                <p class="mdc-typography--caption caption-gray">
                    {$_("dashboardCard.summary.noMotd")}
                </p>
            {/if}
        </Content>
        <Actions fullBleed>
            <Button on:click={() => navigate("/substitutionPlan/" + date)} disabled={entryAmount < 1}>
                <Label>
                    {$_("dashboardCard.summary.amount", {values: {entryAmount}})}
                </Label>
                {#if entryAmount > 0}
                    <Icon class="material-icons">arrow_forward</Icon>
                {/if}
            </Button>
        </Actions>
    </Card>
{/if}

<style>
    :global(.caption-gray) {
        color: rgba(0, 0, 0, .37);
    }
</style>