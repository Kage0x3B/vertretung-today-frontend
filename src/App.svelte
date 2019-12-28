<script>
    import {_} from "svelte-i18n";
    import {onMount} from "svelte";
    import {Router, navigate} from "svelte-routing";
    import api from "./api/api";
    import storage from "./storage";
    import Routes from "./routes/Routes.svelte";
    import {isMobileScreen} from "./util/util";
    import {loggedIn, title} from "./stores/general";
    import {AppContent, Scrim} from "@smui/drawer";
    import NavDrawer from "./_components/NavDrawer.svelte";
    import NavBar from "./_components/NavBar.svelte";
    import {FixedAdjust, DenseFixedAdjust, ProminentFixedAdjust} from '@smui/top-app-bar';

    import initI18N from "./i18n/i18n";

    initI18N();

    api.loadAuth();

    if (api.hasValidAuth()) {
        $loggedIn = true;
    }

    let drawerOpen = false;

    function setDrawerOpen(open) {
        drawerOpen = open;
    }

    $: {
        // Svelte braucht die Klammern iwie, sonst ist document noch nicht initialisiert.
        document.title = $_("titleFormat", {
            values: {
                pageTitle: $_($title),
                appName: $_("appName")
            }
        });
    }

    onMount(() => {
        if ($loggedIn) {
            navigate("/dashboard", {replace: true});
        } else {
            navigate("/login", {replace: true});
        }
    });
</script>

<Router>
    <div class="app-container">
        {#if isMobileScreen()}
            <div class="drawer-container">
                <NavDrawer bind:open={drawerOpen}/>
                <Scrim on:click={() => setDrawerOpen(false)}/>
                <AppContent class="app-content">
                    <header>
                        <NavBar {setDrawerOpen}/>
                    </header>
                    <div use:FixedAdjust>
                        <Routes/>
                    </div>
                </AppContent>
            </div>
        {:else}
            <header>
                <NavBar {setDrawerOpen}/>
            </header>
            <div use:DenseFixedAdjust>
                <div class="drawer-container">
                    <NavDrawer bind:open={drawerOpen}/>
                    <Scrim on:click={() => setDrawerOpen(false)}/>
                    <AppContent class="app-content">
                        <Routes/>
                    </AppContent>
                </div>
            </div>
        {/if}
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

    * :global(.app-content) {
        flex: auto;
        position: relative;
        flex-grow: 1;
    }

    * :global(.mdc-drawer--modal, .mdc-drawer-scrim) {
        position: absolute;
    }
</style>