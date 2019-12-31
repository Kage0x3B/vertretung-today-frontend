<script>
    import {Link} from "svelte-routing";
    import {Item} from '@smui/list';
    import {current_component} from 'svelte/internal';
    import {forwardEventsBuilder} from '@smui/common/forwardEvents.js';

    // Ein Eintrag in der Navigation, benutzt ein paar Svelte Tricks um
    // zu erkennen ob es "aktiv" ist, also die Seite gerade offen ist, die dieser
    // Eintrag beschreibt.

    const forwardEvents = forwardEventsBuilder(current_component);

    export let to = "";
    let activated = false;

    function getProps({location, href, isPartiallyCurrent, isCurrent}) {
        activated = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

        return {};
    }
</script>

<div use:forwardEvents>
    <Link class="remove-link-style" to="{to}" getProps="{getProps}">
        <Item {activated}>
            <slot/>
        </Item>
    </Link>
</div>

<style>
    div :global(a) {
        text-decoration: none;
    }
</style>