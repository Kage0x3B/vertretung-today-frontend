<script>
    import {_} from "svelte-i18n";
    import util from "../../util/util";
    import List, {Item, Text, PrimaryText, SecondaryText, Graphic, Meta} from '@smui/list';

    // Ein Eintrag in der Datei Liste der "Downloads" Seite

    export let fileInfo = {
        id: -1,
        type: "",
        url: "",
        fileName: "",
        mimeType: ""
    };
    export let action;
</script>

<Item on:SMUI:action={action} class="border-bottom-gray">
    <Graphic class="material-icons md-48">{util.MIME_TYPE_ICONS[fileInfo.mimeType]}</Graphic>
    <Text>{fileInfo.fileName}</Text>
    <Meta class="material-icons">get_app</Meta>
</Item>