<script>
    import {_} from "svelte-i18n";
    import Drawer, {AppContent, Content, Header, Title, Subtitle, Scrim} from '@smui/drawer';
    import Button, {Label} from '@smui/button';
    import List, {Item, Text, Graphic, Separator, Subheader} from '@smui/list';
    import {isMobileScreen} from "../util/util";
    import {links} from "svelte-routing";
    import {loggedIn} from "../stores/general";
    import {getContext, onMount} from "svelte";
    import NavLinkItem from "./NavLinkItem.svelte";

    export let open = false;

    let _open;
    $: _open = !isMobileScreen() || open;

    function close() {
        open = false;
    }

    let subtitle;

    if ($loggedIn) {
        subtitle = "schoolName";
    } else {
        subtitle = "general.notLoggedIn";
    }
</script>

<Drawer variant={isMobileScreen() ? "modal" : null} bind:open={_open}>
    {#if isMobileScreen()}
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
                <NavLinkItem to="/help" on:click={close}>
                    <Graphic class="material-icons" aria-hidden="true">help</Graphic>
                    <Text>{$_("navDrawer.items.help")}</Text>
                </NavLinkItem>
            </List>
        </div>
    </Content>
</Drawer>