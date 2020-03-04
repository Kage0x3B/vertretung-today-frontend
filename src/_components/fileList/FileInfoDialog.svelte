<script>
    import {_} from "svelte-i18n";
    import api from "../../api/api";
    import util from "../../util/util";
    import {Icon} from '@smui/common';
    import Dialog, {Title, Content, Actions} from '@smui/dialog';
    import Button, {Label} from '@smui/button';

    export let dialog = null;
    export let fileInfo = {
        id: -1,
        type: "",
        sectionName: "",
        url: "",
        fileName: "",
        mimeType: ""
    };

    let fileTypeKey;

    $: {
        if (fileInfo && util.MIME_TYPE_ICONS[fileInfo.mimeType]) {
            fileTypeKey = "mimeType." + fileInfo.mimeType.replace("/", ".");
        } else {
            fileTypeKey = "mimeType.application.octet-stream";
        }
    }

    function download() {
        api.fileList.download(fileInfo.id, fileInfo.fileName, fileInfo.mimeType).then(() => {
            util.getKitchen().push({
                label: $_("page.fileList.downloadStartedSnackbar")
            });
        }).catch(() => {
            util.getKitchen().push({
                label: $_("page.fileList.downloadProblemSnackbar")
            });
        });
    }
</script>

<Dialog bind:this={dialog}>
    <Title>
        <Icon class="material-icons md-24 dialog-title-icon">{util.MIME_TYPE_ICONS[fileInfo.mimeType]}</Icon>
        {fileInfo.fileName}
    </Title>
    <Content>
        {#if fileInfo.sectionName}
            <span>{$_("page.fileList.dialog.category", {values: {category: fileInfo.sectionName}})}</span>
        {/if}
        <span>{$_("page.fileList.dialog.url", {values: {url: fileInfo.url}})}</span>
        <span>
            {$_("page.fileList.dialog.fileType", {
            values: {fileType: $_(fileTypeKey)}
            })}
        </span>
    </Content>
    <Actions>
        <Button>
            <Label>{$_("general.close")}</Label>
        </Button>
        <Button action="accept" on:click={download}>
            <Label>{$_("page.fileList.dialog.downloadAction")}</Label>
        </Button>
    </Actions>
</Dialog>

<style>
    span {
        display: block;
    }
</style>