<script>
    import {_} from "svelte-i18n";
    import util from "../../util/util";
    import {Icon} from '@smui/common';
    import Dialog, {Title, Content, Actions} from '@smui/dialog';
    import Button, {Label} from '@smui/button';

    export let entry = {
        course: "",
        grade: "",
        gradeString: "",
        courseId: "",
        time: "",
        type: "OTHER",
        room: "",
        teacher: "",
        movedFrom: "",
        movedTo: "",
        notice: ""
    };

    export let dialog = null;

    let useGrade;
    let showRoom;
    let showTeacher;
    let showMovedFrom;
    let showMovedTo;
    let showNotice;
    $: useGrade = entry.grade <= 10;
    $: showRoom = entry.room && entry.room.length > 2;
    $: showTeacher = entry.teacher && entry.teacher.length > 2;
    $: showMovedFrom = entry.movedFrom && entry.movedFrom.length > 2;
    $: showMovedTo = entry.movedTo && entry.movedTo.length > 2;
    $: showNotice = entry.notice && entry.notice.length > 2;
</script>

<Dialog bind:this={dialog}>
    <Title>
        <Icon class="material-icons md-24 dialog-title-icon">{util.SUBSTITUTION_TYPE_ICONS[entry.type]}</Icon>
        {@html $_("page.substitutionPlan.entry.title." + entry.type.toLowerCase(),{values: {
        teacher: entry.teacher,
        room: entry.room
        }})}
    </Title>
    <Content>
        <i style="margin-bottom: 10px;">
            {@html $_("page.substitutionPlan.dialog.time", {values: {time: entry.time}})}
            &nbsp;-&nbsp;
            {#if useGrade}
                {@html $_("page.substitutionPlan.dialog.grade", {values: {grade: entry.gradeString}})}
            {:else}
                {@html $_("page.substitutionPlan.dialog.courseId", {values: {courseId: entry.courseId}})}
            {/if}
        </i>
        <span>{@html $_("page.substitutionPlan.dialog.course", {values: {course: entry.course}})}</span>
        {#if showRoom}
            <span>{@html $_("page.substitutionPlan.dialog.room", {values: {room: entry.room}})}</span>
        {/if}
        {#if showTeacher}
            <span>{@html $_("page.substitutionPlan.dialog.teacher", {values: {teacher: entry.teacher}})}</span>
        {/if}
        {#if showMovedFrom}
            <span>{@html $_("page.substitutionPlan.dialog.movedFromNotice", {values: {from: entry.movedFrom}})}</span>
        {/if}
        {#if showMovedTo}
            <span>{@html $_("page.substitutionPlan.dialog.movedToNotice", {values: {to: entry.movedTo}})}</span>
        {/if}
        {#if showNotice}
            <span>{@html $_("page.substitutionPlan.dialog.notice", {values: {notice: entry.notice}})}</span>
        {/if}
    </Content>
    <Actions>
        <Button action="accept">
            <Label>{$_("general.close")}</Label>
        </Button>
    </Actions>
</Dialog>

<style>
    span {
        display: block;
    }
</style>