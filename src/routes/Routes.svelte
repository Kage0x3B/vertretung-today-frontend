<script>
    import {Route} from "svelte-routing";
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";
    import Help from "./Help.svelte";
    import Home from "./Home.svelte";
</script>

<Route path="/register">
    <Register/>
</Route>
<Route path="/login">
    <Login/>
</Route>
<Route path="/help">
    <Help/>
</Route>
<Route path="/">
    <Home/>
</Route>