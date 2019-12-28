<script>
    import {_} from "svelte-i18n";
    import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import {navigate} from "svelte-routing";

    import {isMobileScreen} from "../util/util";
    import {title, backButton, backUrl} from "../stores/general";

    export let setDrawerOpen;

    let navBarTitle;
    let prominent;

    let backButtonRequested;
    let backButtonUrl;
    let displayBackButton;

    $: navBarTitle = $title;

    $: {
        backButtonRequested = $backButton;
        backButtonUrl = $backUrl;
        displayBackButton = backButtonRequested || backButtonUrl;
    }

    function back() {
        if (backButtonUrl) {
            navigate(backButtonUrl, {replace: true});
        } else {
            window.history.back();
        }
    }
</script>

<TopAppBar variant="fixed" dense={!isMobileScreen()} color='primary'>
    <Row>
        <Section>
            {#if isMobileScreen()}
                {#if displayBackButton}
                    <IconButton class="material-icons" on:click={back}>arrow_back</IconButton>
                {:else}
                    <IconButton class="material-icons" on:click={() => setDrawerOpen(true)}>menu</IconButton>
                {/if}
            {/if}
            <Title>{$_(navBarTitle)}</Title>
        </Section>
        <Section align="end" toolbar>
            <!--<IconButton class="material-icons">more_vert</IconButton>-->
        </Section>
    </Row>
</TopAppBar>