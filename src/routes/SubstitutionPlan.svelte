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

    export let date = "today";
    const today = date === "today";

    let _title = $_("page.substitutionPlan.title." + date);
    $: $title = _title;

    let substitutionData;
    let day;
    let motd;
    let modifiedTime;
    let entries;
    let tableEntries;

    let substitutionDataPromise = api.substitutionPlan.get(date);
    substitutionDataPromise.then(function (response) {
        substitutionData = response.data.payload;
        day = Date.parse(substitutionData.date);
        motd = substitutionData.motd;
        modifiedTime = substitutionData.modifiedTime;
        entries = substitutionData.substitutionEntries;
        tableEntries = convertPlanEntriesForTable(entries);

        if (!today) {
            _title = $_("page.substitutionPlan.title.nextDate", {values: {day}});
        }
    });

    let dialog;
    let dialogEntry;

    function openDialog(entry) {
        dialogEntry = entry;
        dialog.open();
    }

    function convertPlanEntriesForTable(entries) {
        if (!entries || entries.length === 0) {
            return [];
        }

        let tableEntries = [];

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];

            const tableEntry = {
                course: convertReplacement(entry.course, entry.courseReplacement),
                grade: entry.grade,
                gradeString: entry.gradeString,
                courseId: entry.courseId,
                time: entry.time,
                type: entry.type,
                room: convertReplacement(entry.room, entry.roomReplacement),
                teacher: convertReplacement(entry.teacher, entry.teacherReplacement),
                movedFrom: entry.movedFromNotice,
                movedTo: entry.movedToNotice,
                notice: entry.notice
            };

            tableEntries.push(tableEntry);
        }

        return tableEntries;
    }

    function convertReplacement(value, replacement) {
        let html = "";

        if (value && value !== "-") {
            if (replacement && replacement !== "-" && value !== "-") {
                html += "<s>" + value + "</s> ";
            } else {
                html += value;
            }
        }

        if (replacement && replacement !== "-") {
            html += "<i class=\"material-icons md-18 replace-arrow\">arrow_right</i>";
            html += " " + replacement;
        }

        return html;
    }

    function getActualValue(value, replacement) {
        return replacement && replacement !== "-" ? replacement : value;
    }

    let emptyList;
    $: emptyList = !tableEntries || tableEntries.length < 1;
</script>

<BasePage pageTitle={_title}>
    {#await substitutionDataPromise}
        <div style="min-width: 420px">
            <LinearProgress indeterminate/>
        </div>
    {:then ignored}
        <div class="page-wrapper">
            {#if !util.isMobileScreen()}
                <h2 class="mdc-typography--headline5">
                    <Icon class="dashboard-title-icon material-icons">info</Icon>
                    {_title}
                </h2>
                <hr>
            {/if}
            {#if motd && motd.message}
                <p class="mdc-typography--caption caption-gray">
                    {$_("page.substitutionPlan.motd")}
                </p>
                <div class="motd">{@html motd.message}</div>
            {:else}
                <p class="mdc-typography--caption caption-gray">
                    {$_("page.substitutionPlan.noMotd")}
                </p>
            {/if}
            <List twoLine={!emptyList} nonInteractive={emptyList}>
                {#each tableEntries as entry}
                    <SubstitutionListItem {entry} action={() => openDialog(entry)}/>
                {:else}
                    <Item ripple={false}>
                        <Graphic class="material-icons md-48">speaker_notes_off</Graphic>
                        <Text>
                            {$_("page.substitutionPlan.entry.empty")}
                        </Text>
                    </Item>
                {/each}
            </List>
        </div>
    {:catch error}
        {error}
    {/await}
</BasePage>
<SubstitutionEntryDialog bind:dialog={dialog} entry={dialogEntry}/>

<style>
    h2 {
        margin-bottom: 32px;
    }

    :global(.border-bottom-gray) {
        border-bottom: #ddd 1px solid;
    }

    :global(.replace-arrow) {
        vertical-align: text-bottom;
    }

    :global(.dialog-title-icon) {
        color: rgba(0, 0, 0, .38);
        vertical-align: text-bottom;
    }

    .motd {
        margin-bottom: 48px;
    }

    @media (min-width: 768px) {
        .page-wrapper {
            min-width: 50vw;
        }
    }
</style>