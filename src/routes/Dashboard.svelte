<script>
    import {_} from "svelte-i18n";
    import BasePage from "../_components/BasePage.svelte";
    import api from "../api/api";
    import util from "../util/util";
    import {loggedIn, installReady} from "../stores/tempStore";
    import {hideDashboardInstall} from "../stores/permanentStore";
    import {navigate} from "svelte-routing";
    import Card, {Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons} from '@smui/card';
    import Button, {Label} from '@smui/button';
    import {Icon} from '@smui/common';
    import IconButton from '@smui/icon-button';
    import LinearProgress from '@smui/linear-progress';

    import InstallReadyCard from "../_components/dashboard/InstallReadyCard.svelte";
    import SubstitutionInfoCard from "../_components/dashboard/SubstitutionInfoCard.svelte";

    // Dashboard Seite die kommt wenn man eingeloggt ist. Bis jetzt mit Zusammenfassungen der Vertretungseinträge
    // und einer Karte wenn die App installiert werden kann

    let summaryPromise = api.substitutionPlan.getSummary();
</script>

<BasePage pageTitle={$_("page.dashboard.title")} noPaper>
    <div class="card-wrapper">
        <InstallReadyCard/>
        {#await summaryPromise}
            <div style="min-width: 420px">
                <LinearProgress indeterminate/>
            </div>
        {:then summaryData}
            <SubstitutionInfoCard date="today" summaryData={summaryData.data.payload}/>
            <SubstitutionInfoCard date="next" summaryData={summaryData.data.payload}/>
        {:catch error}
            {error}
        {/await}
    </div>
</BasePage>

<style>
    .card-wrapper {
        display: flex;
        flex-direction: column;
    }

    :global(.dashboard-title-icon) {
        vertical-align: middle;
    }

    :global(.dashboard-card) {
        max-width: 420px;
        margin-bottom: 16px;
    }
</style>