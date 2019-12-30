<script>
    import {_} from "svelte-i18n";
    import util from "../../util/util";
    import {installReady} from "../../stores/tempStore";
    import permanentStore, {hideDashboardInstall} from "../../stores/permanentStore";
    import Card, {Content, Actions, ActionButtons, ActionIcons} from '@smui/card';
    import Button, {Label} from '@smui/button';
    import {Icon} from '@smui/common';
    import IconButton from '@smui/icon-button';

    function showInstallDialog() {
        util.showInstallDialog();
    }

    function hideInstall() {
        $hideDashboardInstall = true;
        permanentStore.uploadToAccount();
    }

    let isVisible;
    $: isVisible = $installReady && !$hideDashboardInstall;
</script>

{#if isVisible}
    <Card class="dashboard-card">
        <Content class="mdc-typography--body2">
            <h2 class="mdc-typography--headline6">
                <Icon class="dashboard-title-icon material-icons md-36">get_app</Icon>
                {$_("dashboardCard.install.title")}
            </h2>
            {$_("dashboardCard.install.content.1")}
            {$_("dashboardCard.install.content.2")}
        </Content>
        <Actions>
            <ActionButtons>
                <Button on:click={showInstallDialog}>
                    <Label>{$_("dashboardCard.install.actionInstall")}</Label>
                </Button>
            </ActionButtons>
            <ActionIcons>
                <IconButton class="material-icons" title={$_("dashboardCard.install.actionLater")}
                            on:click={hideInstall}>
                    close
                </IconButton>
            </ActionIcons>
        </Actions>
    </Card>
{/if}