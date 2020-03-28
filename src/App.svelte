<script>
  import trainers from "./skill-trainers.json";
  import { Router, Link, Route } from "svelte-routing";
  import TrainersList from "./TrainersList.svelte";
  import ToDoList from "./ToDoList.svelte";
  import ToDoButton from "./ToDoButton.svelte";
  import { navigate } from "svelte-routing";

  /*
	Object.keys(trainers.mm7).forEach(skillName => {
		let skill = trainers.mm7[skillName];
		Object.keys(skill).filter(x => x != "Category").forEach(level => {
			let trainerChunks = skill[level].split(',');
			let theTrainers = [];
			trainerChunks.forEach(tc => {
				if (tc.indexOf('-')) {
					let locChunks = tc.split('-').map(x => x.trim());
					theTrainers.push({
						name: locChunks[0],
						location: locChunks[1],
					});
				} else {
					theTrainers.push({
						name: tc,
						location: ""
					})
				}
			});
			skill[level] = theTrainers;
			//skill[level] = trainerChunks.map(x => x.trim());
		});
	});

	let output = JSON.stringify(trainers, null, 3);
	*/
  const showToDos = () => {
    if (location.href !== "/check-list") {
      navigate("/check-list");
    }
  };
</script>

<style>
  main {
    padding: 1em;
    margin: 0 auto;
  }
</style>

<main>
  <Router>
    <Route path="trainers-list" component={TrainersList} />
    <Route path="check-list" component={ToDoList} />
    <Route path="" component={TrainersList} />
  </Router>
</main>

<ToDoButton on:click={showToDos} />
