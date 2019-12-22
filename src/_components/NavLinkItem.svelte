<script>
    import {Link} from "svelte-routing";
    import {Item} from '@smui/list';
    import {current_component} from 'svelte/internal';
    import {forwardEventsBuilder} from '@smui/common/forwardEvents.js';
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