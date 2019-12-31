<script>
    import Paper from "@smui/paper";
    import util from "../util/util";
    import {loggedIn, title, backButton, backUrl} from "../stores/tempStore";
    import {fade} from 'svelte/transition';
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";

    // Eine Komponente aus der alle anderen Seiten bestehen, die Teile des
    // App Layouts bereit stellt und einige andere Werkzeuge die oft von
    // Seiten benutzt werden wie z.B. das Überprüfen ob ein Benutzer eingeloggt ist

    export let pageTitle = "";
    export let backBtn = false;
    export let back = "";
    export let allowUnauthorized = false;
    export let noPaper = false;

    onMount(() => {
        if (!$loggedIn && !allowUnauthorized) {
            navigate("/login", {replace: true});

            return;
        }

        $title = pageTitle;
        $backButton = backBtn;
        $backUrl = back;
    });

    const mobileScreen = util.isMobileScreen();
</script>

<main class="page-wrapper">
    <!--<div class="page-content" transition:fade="{{duration: 200}}">-->
        <!-- noPaper || isMobileScreen() is not possible, maybe weird bug but this is an easy workaround -->
        {#if mobileScreen}
            <slot/>
        {:else if noPaper}
            <slot/>
        {:else}
            <Paper class="base-paper">
                <slot/>
            </Paper>
        {/if}
    <!--</div>-->
</main>

<style>
    .page-wrapper {
        overflow: scroll;
        box-sizing: border-box;
        height: 100%;
        background-color: #fff;
        padding: 8px;
        z-index: 0;
    }

    @media (min-width: 768px) {
        .page-wrapper {
            overflow: auto;
            display: flex;
            justify-content: center;
            padding: 8px;
            background-color: #eee;
            min-height: 95vh;
        }

        :global(.base-paper) {
            max-width: 50vw;
            height: min-content;
        }
    }
</style>