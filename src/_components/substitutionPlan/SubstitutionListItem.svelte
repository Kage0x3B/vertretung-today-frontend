<script>
    import {_} from "svelte-i18n";
    import util from "../../util/util";
    import List, {Item, Text, PrimaryText, SecondaryText, Graphic, Meta} from '@smui/list';

    // Vertretungseintrag in der Liste auf den Vertretungsplan Seiten

    export let entry;
    export let action;
</script>

<Item on:SMUI:action={action} class="border-bottom-gray">
    <Graphic class="material-icons md-48">{util.SUBSTITUTION_TYPE_ICONS[entry.type]}</Graphic>
    <Text>
        <PrimaryText>
            {@html $_("page.substitutionPlan.entry.subtitle.time", {values: {time: entry.time}})}
            &nbsp;-&nbsp;
            {@html entry.course}
        </PrimaryText>
        <SecondaryText>
            {@html $_("page.substitutionPlan.entry.title." + entry.type.toLowerCase(),{values: {
            teacher: entry.teacher,
            room: entry.room
            }})}
        </SecondaryText>
    </Text>
    <Meta class="material-icons">info</Meta>
</Item>