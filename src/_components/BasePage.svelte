<script>
    import Paper from "@smui/paper";
    import util from "../util/util";
    import {loggedIn, title, backButton, backUrl} from "../stores/tempStore";
    import {fade} from 'svelte/transition';
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";

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
</script>

<main class="page-wrapper">
    <!--<div class="page-content" transition:fade="{{duration: 200}}">-->
        <!-- noPaper || isMobileScreen() is not possible, maybe weird bug but this is an easy workaround -->
        {#if util.isMobileScreen()}
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
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
        padding: 16px 8px 48px;
        overflow: auto;
        z-index: 0;
    }

    @media (min-width: 768px) {
        .page-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #eee;
            padding: 16px 0;
            height: 95vh;
        }

        :global(.base-paper) {
            max-width: 50vw;
        }
    }
</style>