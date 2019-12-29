<script>
    import {_} from "svelte-i18n";
    import BasePage from "../_components/BasePage.svelte";
    import api from "../api/api";
    import util from "../util/util";
    import substitutionUtil from "../util/substitutionUtil";
    import Card, {Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons} from '@smui/card';
    import List, {Item, Text, PrimaryText, SecondaryText, Graphic, Meta} from '@smui/list';
    import Button, {Label} from '@smui/button';
    import {Icon} from '@smui/common';
    import IconButton from '@smui/icon-button';
    import LinearProgress from '@smui/linear-progress';

    export let date = "today";

    const today = date === "today";

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
        tableEntries = substitutionUtil.convertPlanEntriesForTable(entries);

        console.log(tableEntries)
    })
</script>

<BasePage pageTitle={$_("page.substitutionPlan.title." + date, {values: {day}})}>
    <div class="page-wrapper">
        {#await substitutionDataPromise}
            <div style="min-width: 420px">
                <LinearProgress indeterminate/>
            </div>
        {:then ignored}
            {#if !util.isMobileScreen()}
                <h2 class="mdc-typography--headline5">
                    <Icon class="dashboard-title-icon material-icons">info</Icon>
                    {$_("page.substitutionPlan.title." + date, {values: {day}})}
                </h2>
                <hr>
            {/if}
            <List twoLine>
                {#each tableEntries as entry}
                    <Item on:SMUI:action={() => alert("nice")} class="border-bottom-gray">
                        <Graphic class="material-icons md-48">close</Graphic>
                        <Text>
                            <PrimaryText>{@html entry.course} - {@html entry.time}</PrimaryText>
                            <SecondaryText>{@html entry.room}</SecondaryText>
                        </Text>
                        <Meta class="material-icons">info</Meta>
                        <!--<Text>{@html entry.time}</Text>
                        <Text>{@html entry.type}</Text>
                        <Text>{@html entry.room}</Text>
                        <Text>{@html entry.teacher}</Text>-->
                    </Item>
                {/each}
            </List>
        {:catch error}
            {error}
        {/await}
    </div>
</BasePage>

<style>
    h2 {
        margin-bottom: 32px;
    }

    :global(.border-bottom-gray) {
        border-bottom: #ddd 1px solid;
    }

    :global(.base-paper) {
        padding: 0;
    }

    :global(.replace-arrow) {
        vertical-align: text-bottom;
    }

    @media (min-width: 768px) {
        .page-wrapper {
            min-width: 50vw;
        }

        :global(.substitution-table) {
            width: 80%;
        }
    }
</style>