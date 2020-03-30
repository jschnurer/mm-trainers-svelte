<script>
  import trainers from "./skill-trainers.json";
  import { Router, Link, Route } from "svelte-routing";
  import TrainersList from "./TrainersList.svelte";
	import ToDoList from "./ToDoList.svelte";
	import Menu from "./Menu.svelte";
</script>

<style>
  main {
    padding: 1em;
    margin: 0 auto;
  }
</style>

<main>
  <Router>
    <Route path={window.__settings.hostDir + "/trainers-list/:game"} let:params>
			<TrainersList game={params.game} />
		</Route>
    <Route path={window.__settings.hostDir + "/check-list/:game"} let:params>
			<ToDoList game={params.game} />
		</Route>
		<Route>
			<Menu />
		</Route>
  </Router>
</main>
