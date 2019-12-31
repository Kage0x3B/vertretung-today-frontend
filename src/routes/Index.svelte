<script>
    import {loggedIn} from "../stores/tempStore";
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";

    // Diese Route kümmert sich um die "/" URL und leitet den Benutzer direkt weiter, je nachdem,
    // ob dieser eingeloggt ist oder nicht.

    onMount(() => {
        if ($loggedIn) {
            navigate("/dashboard", {replace: true});
        } else {
            navigate("/login", {replace: true});
        }
    });
</script>