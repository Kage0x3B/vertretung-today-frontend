<script>
    import Paper from "@smui/paper";
    import {isMobileScreen} from "../util/util";
    import {fade} from 'svelte/transition';
    import {onMount} from "svelte";
    import {title} from "../stores/general";

    export let pageTitle = "";

    onMount(() => {
        $title = pageTitle;
    });
</script>

<main class="page-wrapper">
    <div class="page-content" transition:fade="{{duration: 200}}">
        {#if isMobileScreen()}
            <slot/>
        {:else}
            <Paper class="main-paper">
                <slot/>
            </Paper>
        {/if}
    </div>
</main>

<style>
    .page-wrapper {
        overflow: hidden;
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
        padding: 16px;
    }

    @media (min-width: 768px) {
        .page-wrapper {
            background-color: #eee;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 10vh 0 0;
        }

        .page-content {
            overflow: auto;
            min-width: 20vw;
            min-height: 40vh;
        }
    }
</style>