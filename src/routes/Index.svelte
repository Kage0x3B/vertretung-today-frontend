<script>
    import {loggedIn} from "../stores/tempStore";
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";

    onMount(() => {
        if ($loggedIn) {
            navigate("/dashboard", {replace: true});
        } else {
            navigate("/login", {replace: true});
        }
    });
</script>