import {addMessages, init} from "svelte-i18n";

import de from "./de";
import en from "./en";

export default function () {
    addMessages("de", de);
    addMessages("en", en);

    init({
        fallbackLocale: "de",
        initialLocale: {
            navigator: true
        }
    });
}