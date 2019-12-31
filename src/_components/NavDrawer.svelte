<script>
    import {_} from "svelte-i18n";
    import Drawer, {AppContent, Content, Header, Title, Subtitle, Scrim} from '@smui/drawer';
    import Button, {Label} from '@smui/button';
    import List, {Item, Text, Graphic, Separator, Subheader} from '@smui/list';
    import util from "../util/util";
    import {links} from "svelte-routing";
    import {loggedIn, installReady} from "../stores/tempStore";
    import {getContext, onMount} from "svelte";
    import NavLinkItem from "./NavLinkItem.svelte";

    // Die Navigation die auf Smartphones ausgeklappt werden kann und auf Computern
    // immer auf der linken Seite vorhanden ist

    export let open = false;

    let _open;
    $: _open = !util.isMobileScreen() || open;

    function close() {
        open = false;
    }

    function showInstallPrompt() {
        open = false;
        util.showInstallDialog();
    }

    let subtitle;

    if ($loggedIn) {
        subtitle = "schoolName";
    } else {
        subtitle = "general.notLoggedIn";
    }
</script>

<Drawer variant={util.isMobileScreen() ? "modal" : null} bind:open={_open}>
    {#if util.isMobileScreen()}
        <Header>
            <Title>{$_("appName")}</Title>
            <Subtitle>{$_(subtitle)}</Subtitle>
        </Header>
    {/if}
        <!--suppress HtmlDeprecatedTag -->
    <Content>
        <div use:links>
            <List>
                {#if $loggedIn}
                    <NavLinkItem to="/dashboard" on:click={close}>
                        <Graphic class="material-icons" aria-hidden="true">home</Graphic>
                        <Text>{$_("navDrawer.items.dashboard")}</Text>
                    </NavLinkItem>
                    <NavLinkItem to="/substitutionPlan/today" on:click={close}>
                        <Graphic class="material-icons" aria-hidden="true">event_note</Graphic>
                        <Text>{$_("navDrawer.items.substitutionToday")}</Text>
                    </NavLinkItem>
                    <NavLinkItem to="/substitutionPlan/next" on:click={close}>
                        <Graphic class="material-icons" aria-hidden="true">event_note</Graphic>
                        <Text>{$_("navDrawer.items.substitutionNext")}</Text>
                    </NavLinkItem>
                    <Separator nav/>
                    <NavLinkItem to="/files" on:click={close}>
                        <Graphic class="material-icons" aria-hidden="true">cloud_download</Graphic>
                        <Text>{$_("navDrawer.items.files")}</Text>
                    </NavLinkItem>
                {:else}
                    <NavLinkItem to="/login" on:click={close}>
                        <Graphic class="material-icons" aria-hidden="true">lock_open</Graphic>
                        <Text>{$_("navDrawer.items.login")}</Text>
                    </NavLinkItem>
                    <NavLinkItem to="/register" on:click={close}>
                        <Graphic class="material-icons" aria-hidden="true">post_add</Graphic>
                        <Text>{$_("navDrawer.items.register")}</Text>
                    </NavLinkItem>
                {/if}
                <Separator nav/>
                {#if $installReady}
                    <Item on:click={showInstallPrompt}>
                        <Graphic class="material-icons" aria-hidden="true">get_app</Graphic>
                        <Text>{$_("navDrawer.items.install")}</Text>
                    </Item>
                {/if}
                {#if $loggedIn}
                    <NavLinkItem to="/settings" on:click={close}>
                        <Graphic class="material-icons" aria-hidden="true">tune</Graphic>
                        <Text>{$_("navDrawer.items.settings")}</Text>
                    </NavLinkItem>
                {/if}
                <NavLinkItem to="/help" on:click={close}>
                    <Graphic class="material-icons" aria-hidden="true">help</Graphic>
                    <Text>{$_("navDrawer.items.help")}</Text>
                </NavLinkItem>
            </List>
        </div>
    </Content>
</Drawer>