<script>
    import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';

    import {isMobileScreen} from "../util/util";
    import {title} from "../stores/general";

    export let setDrawerOpen;

    let navBarTitle = $title;

    $: navBarTitle = $title;
</script>

<TopAppBar variant="static" dense={!isMobileScreen()} color='primary'>
    <Row>
        <Section>
            {#if isMobileScreen()}
                <IconButton class="material-icons" on:click={() => setDrawerOpen(true)}>menu</IconButton>
            {/if}
            <Title>{navBarTitle}</Title>
        </Section>
        <Section align="end" toolbar>
            <IconButton class="material-icons" aria-label="Download">file_download</IconButton>
            <IconButton class="material-icons" aria-label="Print this page">print</IconButton>
            <IconButton class="material-icons" aria-label="Bookmark this page">bookmark</IconButton>
        </Section>
    </Row>
</TopAppBar>