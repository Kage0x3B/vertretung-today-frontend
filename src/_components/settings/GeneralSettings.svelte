<script>
    import {_} from "svelte-i18n";
    import util from "../../util/util";
    import {grade, gradeAddition, courses} from "../../stores/permanentStore";
    import Textfield from "@smui/textfield";
    import HelperText from '@smui/textfield/helper-text/index';
    import FormField from '@smui/form-field';
    import {Icon} from '@smui/common';
    import Select, {Option} from '@smui/select';
    import SelectHelperText from '@smui/select/helper-text/index';

    // Teil der "Einstellungen" Seite, dieser enthält Einstellungen zu der Stufe, und Klasse
    // oder Kursen die ein Schüler belegt, um den Vertretungsplan zu personalisieren und zu filtern

    const GRADES = [5, 6, 7, 8, 9, 10, 11, 12, 13];
    const GRADE_ADDITION_REGEX = /^[a-z]$/;
    const COURSE_LIST_REGEX = /^([0-9]{1,2}[a-z]{1,2}[0-9]{1,2})(, ?[0-9]{1,2}[a-z]{1,2}[0-9]{1,2})*$/i;

    export let invalid = false;
    export const update = function () {
        if (invalid) {
            return;
        }

        $grade = gradeVal;

        if (gradeVal > 0 && gradeVal <= 10) {
            $gradeAddition = gradeAddition;
            $courses = [];
        } else if (gradeVal > 10) {
            $courses = courseList.split(",").map((e) => e.trim());
            $gradeAddition = "";
        } else {
            $gradeAddition = "";
            $courses = [];
        }
    };

    let gradeVal = $grade;
    let gradeAdditionVal = $gradeAddition;
    let courseList = $courses.join(",");

    let displayGradeAddition;
    let displayCourseList;

    $: displayGradeAddition = gradeVal > 0 && gradeVal <= 10;
    $: displayCourseList = gradeVal > 10;

    let gradeAdditionInvalid;
    let courseListInvalid;
    $: gradeAdditionInvalid = displayGradeAddition && gradeAdditionVal.length !== 1;
    $: courseListInvalid = displayCourseList && courseList.length > 0 && !COURSE_LIST_REGEX.test(courseList);
    $: invalid = gradeAdditionInvalid || courseListInvalid;
</script>

<div class="container">
    <div class="form-field-container">
        <Select enhanced variant="outlined" bind:value={gradeVal} label={$_("page.settings.general.grade")}>
            <Option value={-1}>{$_("page.settings.general.gradeNoSelection")}</Option>
            {#each GRADES as grade}
                <Option value={grade} selected={gradeVal === grade}>{grade}</Option>
            {/each}
        </Select>
    </div>
    {#if displayGradeAddition}
        <div class="form-field-container">
            <Textfield variant="outlined" label={$_("page.settings.general.gradeAddition")}
                       bind:value={gradeAdditionVal}
                       invalid={gradeAdditionInvalid}>
            </Textfield>
            <HelperText validationMsg>{$_("page.settings.general.gradeAdditionHelper")}</HelperText>
        </div>
    {:else if displayCourseList}
        <div class="form-field-container">
            <Textfield textarea variant="outlined" label={$_("page.settings.general.courseList")}
                       bind:value={courseList}
                       invalid={courseListInvalid}>
            </Textfield>
            <HelperText validationMsg>{$_("page.settings.general.courseListHelper")}</HelperText>
        </div>
    {/if}
</div>
<style>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .form-field-container {
        margin: 16px 0;
        width: 100%;
    }

    .form-field-container :global(.mdc-text-field) {
        width: 100%;
    }

    .form-field-container :global(.mdc-select) {
        width: 100%;
    }

    @media (min-width: 768px) {
        .container {
            min-width: 420px;
        }
    }
</style>