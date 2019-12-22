<script>
    import {Router} from "svelte-routing";
    import Routes from "./routes/Routes.svelte";

    import {AppContent, Scrim} from "@smui/drawer";
    import NavDrawer from "./_components/NavDrawer.svelte";
    import NavBar from "./_components/NavBar.svelte";
    import {isMobileScreen} from "./util/util";
    import {title} from "./stores/general";
    import {onMount} from "svelte";

    let drawerOpen = false;

    function setDrawerOpen(open) {
        drawerOpen = open;
    }

    $: {
        // Svelte braucht die Klammern iwie, sonst ist document noch nicht initialisiert.
        document.title = $title + " - VertretungToday";
    }
</script>

<Router>
    <div class="app-container">
        {#if !isMobileScreen()}
            <header>
                <NavBar {setDrawerOpen}/>
            </header>
        {/if}
        <div class="drawer-container">
            <NavDrawer bind:open={drawerOpen} subtitle="Not logged in"/>
            <Scrim on:click={() => setDrawerOpen(false)}/>
            <AppContent class="app-content">
                {#if isMobileScreen()}
                    <header>
                        <NavBar {setDrawerOpen}/>
                    </header>
                {/if}
                <Routes/>
            </AppContent>
        </div>
    </div>
</Router>

<style type="text/scss">
    .app-container {
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .drawer-container {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    * :global(.mdc-drawer--modal, .mdc-drawer-scrim) {
        position: absolute;
    }

    * :global(.app-content) {
        flex: auto;
        position: relative;
        flex-grow: 1;
    }
</style>