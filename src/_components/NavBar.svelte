<script>
    import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';

    import {isMobileScreen} from "../util/util";
    import {title, prominentNav} from "../stores/general";

    export let setDrawerOpen;

    let navBarTitle = $title;
    let prominent = $prominentNav;

    $: navBarTitle = $title;
    $: prominent = $prominentNav;
</script>

<TopAppBar variant="static" dense={!isMobileScreen()} prominent={prominent && isMobileScreen()} color='primary'>
    <Row>
        <Section>
            {#if isMobileScreen()}
                <IconButton class="material-icons" on:click={() => setDrawerOpen(true)}>menu</IconButton>
            {/if}
            <Title>{navBarTitle}</Title>
        </Section>
        <Section align="end" toolbar>
            <IconButton class="material-icons" aria-label="Settings">more_vert</IconButton>
        </Section>
    </Row>
</TopAppBar>