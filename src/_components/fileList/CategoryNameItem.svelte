<script>
    import {_} from "svelte-i18n";
    import util from "../../util/util";
    import List, {Item, Text, PrimaryText, SecondaryText, Graphic, Meta} from '@smui/list';

    export let categoryName;
</script>

<Item class="border-bottom-gray" disabled>
    <Graphic class="material-icons md-32">keyboard_arrow_down</Graphic>
    <Text>
        <SecondaryText>{categoryName}</SecondaryText>
    </Text>
</Item>