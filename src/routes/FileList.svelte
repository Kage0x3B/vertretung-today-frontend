<script>
    import {_} from "svelte-i18n";
    import BasePage from "../_components/BasePage.svelte";
    import api from "../api/api";
    import util from "../util/util";
    import Card, {Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons} from '@smui/card';
    import List, {Item, Text, PrimaryText, SecondaryText, Graphic, Meta} from '@smui/list';
    import Button, {Label} from '@smui/button';
    import {Icon} from '@smui/common';
    import IconButton from '@smui/icon-button';
    import LinearProgress from '@smui/linear-progress';
    import SubstitutionListItem from "../_components/substitutionPlan/SubstitutionListItem.svelte";
    import SubstitutionEntryDialog from "../_components/substitutionPlan/SubstitutionEntryDialog.svelte";
    import {title} from "../stores/tempStore";
    import FileListItem from "../_components/fileList/FileListItem.svelte";
    import FileInfoDialog from "../_components/fileList/FileInfoDialog.svelte";

    // Seite mit einer Liste von Dateien die zum Download bereit stehen wie z.B. die Stundenplan PDFs

    let fileList;

    let dialog;
    let dialogFileInfo;

    let fileListPromise = api.fileList.list();
    fileListPromise.then(function (response) {
        fileList = response.data.payload;
    });

    function openDialog(fileInfo) {
        dialogFileInfo = fileInfo;
        dialog.open();
    }

    let emptyList;
    $: emptyList = !fileList || fileList.length < 1;
</script>

<BasePage pageTitle={$_("page.fileList.title")}>
    {#await fileListPromise}
        <div style="min-width: 420px">
            <LinearProgress indeterminate/>
        </div>
    {:then ignored}
        <div class="page-wrapper">
            {#if !util.isMobileScreen()}
                <h2 class="mdc-typography--headline5">
                    {$_("page.fileList.title")}
                </h2>
                <hr>
            {/if}
            <List nonInteractive={emptyList}>
                {#each fileList as fileInfo}
                    <FileListItem {fileInfo} action={() => openDialog(fileInfo)}/>
                {:else}
                    <Item ripple={false}>
                        <Graphic class="material-icons md-48">folder_open</Graphic>
                        <Text>
                            {$_("page.fileList.entry.empty")}
                        </Text>
                    </Item>
                {/each}
            </List>
        </div>
    {:catch error}
        {error}
    {/await}
</BasePage>
<FileInfoDialog bind:dialog={dialog} fileInfo={dialogFileInfo}/>

<style>
    h2 {
        margin-bottom: 32px;
    }

    :global(.border-bottom-gray) {
        border-bottom: #ddd 1px solid;
    }

    :global(.dialog-title-icon) {
        color: rgba(0, 0, 0, .38);
        vertical-align: text-bottom;
    }

    @media (min-width: 768px) {
        .page-wrapper {
            min-width: 20vw;
        }
    }
</style>