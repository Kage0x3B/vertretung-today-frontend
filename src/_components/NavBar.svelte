<script>
    import {_} from "svelte-i18n";
    import {Icon} from '@smui/common';
    import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar';
    import Menu, {SelectionGroup, SelectionGroupIcon} from '@smui/menu';
    import List, {Item, Separator, Text, PrimaryText, SecondaryText, Graphic} from '@smui/list';
    import IconButton from '@smui/icon-button';
    import {navigate} from "svelte-routing";

    import api from "../api/api";
    import util from "../util/util";
    import {loggedIn, title, backButton, backUrl} from "../stores/tempStore";

    export let setDrawerOpen;

    let menu;
    let navBarTitle;
    let prominent;

    let displayBackButton;

    $: navBarTitle = $title;

    $: displayBackButton = $backButton || $backUrl;

    function back() {
        if ($backUrl) {
            navigate($backUrl, {replace: true});
        } else {
            window.history.back();
        }
    }

    function logout() {
        api.setJwtToken("");
        $loggedIn = false;
        navigate("/", {replace: true});
    }
</script>

<TopAppBar variant="fixed" dense={!util.isMobileScreen()} color='primary'>
    <Row>
        <Section>
            {#if util.isMobileScreen()}
                {#if displayBackButton}
                    <IconButton class="material-icons" on:click={back}>arrow_back</IconButton>
                {:else}
                    <IconButton class="material-icons" on:click={() => setDrawerOpen(true)}>menu</IconButton>
                {/if}
            {/if}
            <Title>{navBarTitle}</Title>
        </Section>
        <Section align="end" toolbar>
            <div>
                {#if $loggedIn}
                    <IconButton class="material-icons" on:click={() => menu.setOpen(true)}>more_vert</IconButton>
                    <Menu bind:this={menu}>
                        <List>
                            <Item on:SMUI:action={() => navigate("/settings")}>
                                <Icon class="material-icons menu-item-icon">tune</Icon>
                                <Text>{$_("navBar.items.settings")}</Text>
                            </Item>
                            <Separator />
                            <Item on:SMUI:action={logout}>
                                <Icon class="material-icons menu-item-icon">exit_to_app</Icon>
                                <Text>{$_("navBar.items.logout")}</Text>
                            </Item>
                        </List>
                    </Menu>
                {/if}
            </div>
        </Section>
    </Row>
</TopAppBar>

<style>
    :global(.menu-item-icon) {
        margin-right: 4px;
    }
</style>