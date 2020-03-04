<script>
    import {Route} from "svelte-routing";
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";
    import Help from "./Help.svelte";
    import Error from "./Error.svelte";
    import ValidateMoodle from "./ValidateMoodle.svelte";
    import ValidateInfo from "./ValidateInfo.svelte";
    import Index from "./Index.svelte";
    import Dashboard from "./Dashboard.svelte";
    import SubstitutionPlan from "./SubstitutionPlan.svelte";
    import Settings from "./Settings.svelte";
    import FileList from "./FileList.svelte";
</script>

<!--
This needs to be split up instead of using path params to prevent using the same base page
for a different substitution plan page might cause issues with title updating etc.
-->
<Route path="/substitutionPlan/today">
    <SubstitutionPlan date="today"/>
</Route>
<Route path="/substitutionPlan/tomorrow">
    <SubstitutionPlan date="tomorrow"/>
</Route>
<Route path="/files">
    <FileList/>
</Route>
<Route path="/settings">
    <Settings/>
</Route>
<Route path="/dashboard">
    <Dashboard/>
</Route>
<Route path="/validate/moodle">
    <ValidateMoodle/>
</Route>
<Route path="/validate">
    <ValidateInfo/>
</Route>
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
    <Index/>
</Route>
<Route path="">
    <Error/>
</Route>