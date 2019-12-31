import {get as getFromStore} from "svelte/store";
import {grade} from "../stores/permanentStore";

// API zum herunterladen von Vertretungsplan Einträgen und weiteren Informationen und der Zusammenfassung für das Dashboard
export default function (axios) {
    function getSummary() {
        return axios.get("/substitutionPlan/summary", {
            params: {
                grade: getFromStore(grade),
                courses: []
            }
        });
    }

    function get(date) {
        return axios.get("/substitutionPlan/get/" + date, {
            params: {
                grade: getFromStore(grade),
                courses: []
            }
        });
    }

    return {
        getSummary, get
    };
};