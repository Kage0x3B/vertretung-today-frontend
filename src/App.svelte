<script>
    import {_} from "svelte-i18n";
    import {onMount} from "svelte";
    import {Router, navigate} from "svelte-routing";
    import api from "./api/api";
    import storage from "./storage";
    import Routes from "./routes/Routes.svelte";
    import util from "./util/util";
    import {loggedIn, installReady, title} from "./stores/tempStore";
    import permanentStore from "./stores/permanentStore";
    import {AppContent, Scrim} from "@smui/drawer";
    import NavDrawer from "./_components/NavDrawer.svelte";
    import NavBar from "./_components/NavBar.svelte";
    import {FixedAdjust, DenseFixedAdjust, ProminentFixedAdjust} from '@smui/top-app-bar';
    import Kitchen from '@smui/snackbar/kitchen/index';
    import Dialog, {Title, Content, Actions} from '@smui/dialog';
    import Button, {Label} from '@smui/button';

    import initI18N from "./i18n/i18n";

    // Die Haupt Svelte Datei und Komponente der App.
    // Beinhaltet einige Funktionen die auf allen Seiten benutzt werden wie das Anzeigen
    // einer Snackbar (Android Sprache für eine Benachrichtigung oft unten am Bildschirm),
    // kümmert sich um das Event zum Installieren der App,
    // stellt viele Teile des Layouts der App bereit, die Übersetzungsfunktion und vieles mehr

    let kitchen;
    let installDialog;
    let drawerOpen = false;

    initI18N();

    permanentStore._setApi(api);
    api.loadAuth();

    if (api.hasValidAuth()) {
        $loggedIn = true;
    }

    function setDrawerOpen(open) {
        drawerOpen = open;
    }

    $: {
        // Svelte braucht die Klammern iwie, sonst ist document noch nicht initialisiert.
        document.title = $_("titleFormat", {
            values: {
                pageTitle: $title,
                appName: $_("appName")
            }
        });
    }

    onMount(() => {
        util.setKitchen(kitchen);
        util.setInstallDialog(installDialog);

        window.addEventListener('beforeinstallprompt', function(event) {
            event.preventDefault();

            util.stashInstallPrompt(event);
            $installReady = true;
        });

        if ($loggedIn) {
            navigate("/dashboard", {replace: true});
        } else {
            navigate("/login", {replace: true});
        }
    });

    function installApp() {
        util._showInstallPrompt().then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                $installReady = false;

                util.getKitchen().push({
                    label: $_("general.install.successful")
                });
            } else {
                util.getKitchen().push({
                    label: $_("general.install.rejected")
                });
            }
        });
    }
</script>

<Router>
    <div id="app-container" class="app-container">
        {#if util.isMobileScreen()}
            <div class="drawer-container">
                <NavDrawer bind:open={drawerOpen}/>
                <Scrim on:click={() => setDrawerOpen(false)}/>
                <AppContent class="app-content">
                    <header>
                        <NavBar {setDrawerOpen}/>
                    </header>
                    <div class="fixed-navbar-adjust">
                        <Routes/>
                    </div>
                </AppContent>
            </div>
        {:else}
            <header>
                <NavBar {setDrawerOpen}/>
            </header>
            <div class="fixed-navbar-adjust-dense">
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
<Kitchen bind:this={kitchen} dismiss$class="material-icons" />
<Dialog
        bind:this={installDialog}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-content"
>
    <Title id="dialog-title">{$_("dialog.install.title")}</Title>
    <Content id="dialog-content">
        {$_("dialog.install.content")}
    </Content>
    <Actions>
        <Button>
            <Label>{$_("dialog.install.actionLater")}</Label>
        </Button>
        <Button on:click={installApp}>
            <Label>{$_("dialog.install.actionInstall")}</Label>
        </Button>
    </Actions>
</Dialog>

<style type="text/scss">
    .app-container {
        width: 100%;
        height: 100vh;
    }

    .drawer-container {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    .fixed-navbar-adjust {
        margin-top: 56px;
    }

    .fixed-navbar-adjust-dense {
        padding-top: 48px;
    }

    * :global(.app-content) {
        flex: auto;
        flex-grow: 1;
    }

    * :global(.mdc-drawer--modal, .mdc-drawer-scrim) {
        position: absolute;
    }
</style>