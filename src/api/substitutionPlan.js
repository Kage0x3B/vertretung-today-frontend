import {get as getFromStore} from "svelte/store";
import {grade, gradeAddition, courses} from "../stores/permanentStore";

export default function (axios) {
    function getCoursesString() {
        const coursesList = getFromStore(courses);

        return coursesList && coursesList.length > 0 ? coursesList.join(",") : "";
    }

    function getSummary() {
        return axios.get("/substitution-plan/summary", {
            params: {
                grade: getFromStore(grade),
                gradeAddition: getFromStore(gradeAddition),
                courses: getCoursesString()
            }
        });
    }

    function get(date) {
        return axios.get("/substitution-plan/get/" + date, {
            params: {
                grade: getFromStore(grade),
                gradeAddition: getFromStore(gradeAddition),
                courses: getCoursesString()
            }
        });
    }

    return {
        getSummary, get
    };
};