<script>
    import {_} from "svelte-i18n";
    import BasePage from "../_components/BasePage.svelte";
    import {loggedIn} from "../stores/general";
    import {navigate} from "svelte-routing";
    import Card, {Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons} from '@smui/card';
    import Button, {Label} from '@smui/button';
    import IconButton, {Icon} from '@smui/icon-button';
</script>

<BasePage pageTitle="page.dashboard.title" noPaper>
    <Card style="width: 360px;">
    <PrimaryAction>
        <Content class="mdc-typography--body2">
            This item is so glorious that you would have to be some kind of fool to not immediately buy it.
        </Content>
    </PrimaryAction>
    <Actions>
        <ActionButtons>
            <Button>
                <Label>Add to Card</Label>
            </Button>
            <Button>
                <Label>Buy Now</Label>
            </Button>
        </ActionButtons>
        <ActionIcons>
            <IconButton toggle aria-label="Add to favorites" title="Add to favorites">
                <Icon class="material-icons" on>favorite</Icon>
                <Icon class="material-icons">favorite_border</Icon>
            </IconButton>
            <IconButton class="material-icons" title="Share">share</IconButton>
        </ActionIcons>
    </Actions>
    </Card>
</BasePage>