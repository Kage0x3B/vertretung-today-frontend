<script>
    import Paper from "@smui/paper";
    import {isMobileScreen} from "../util/util";
    import {loggedIn, title, backButton, backUrl} from "../stores/general";
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
    <div class="page-content" transition:fade="{{duration: 200}}">
        {#if noPaper || isMobileScreen()}
            <slot/>
        {:else}
            <Paper>
                <slot/>
            </Paper>
        {/if}
    </div>
</main>

<style>
    .page-wrapper {
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
        padding: 16px 8px 48px;
    }

    .page-content {
        overflow: scroll;
        height: 100%;
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

        .page-content {
            overflow: auto;
            overflow-x: hidden;
            overflow-y: auto;

            max-width: 50vw;
        }
    }
</style>