function convertPlanEntriesForTable(entries) {
    if(!entries || entries.length === 0) {
        return [];
    }

    let tableEntries = [];

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];

        const tableEntry = {
            course: convertReplacement(entry.course, entry.courseReplacement),
            time: entry.time,
            type: entry.type,
            room: convertReplacement(entry.room, entry.roomReplacement),
            teacher: convertReplacement(entry.teacher, entry.teacherReplacement)
        };

        tableEntries.push(tableEntry);
    }

    return tableEntries;
}

function convertReplacement(value, replacement) {
    let html = "";

    if (value && value !== "-") {
        if (replacement && value !== "-") {
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

export default {
    convertPlanEntriesForTable, convertReplacement
}