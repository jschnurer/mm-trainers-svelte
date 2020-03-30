<script>
  import trainersList from "./skill-trainers.json";
  import SkillLevel from "./SkillLevel.svelte";
  import toDoStore from "./toDoStore.js";
  import AddSkillModal from "./AddSkillModal.svelte";
  import { Link, navigate } from "svelte-routing";
  import ToDoButton from "./ToDoButton.svelte";

  export let game = "";

  let inspectedSkill = null;
  let trainerListVisible = false;

  $: skills = trainersList[game];
  $: categories = [...new Set(skills.map(skill => skill.category))];
  $: levels = [...new Set(skills.map(skill => skill.level))];
  $: skillByCat = skills.reduce((acc, skill) => {
    if (!acc.find(x => x.skill === skill.skill)) {
      acc.push({ skill: skill.skill, category: skill.category });
    }
    return acc;
  }, []);

  const getSkillsByCategory = cat => {
    let trainers = skills.filter(x => x.category === cat);

    let unqSkills = [...new Set(trainers.map(x => x.skill))];

    return unqSkills.map(skillName => {
      let skill = {
        skill: skillName
      };

      levels.forEach(lvl => {
        skill[lvl] = trainers.filter(
          t => t.skill === skillName && t.level === lvl
        );
      });

      return skill;
    });
  };

  const skillSorter = (a, b) => (a.skill < b.skill ? -1 : 1);

  const showAdd = skill => {
    inspectedSkill = skill;
  };

  const levelClick = level => {
    let toDos = $toDoStore;
    let toDosForGame = toDos[game];
    if (!toDosForGame) {
      toDosForGame = [];
      toDos[game] = toDosForGame;
    }

    let skill = toDosForGame.find(
      x => x.skill === inspectedSkill.skill && x.level === level
    );

    if (!skill) {
      toDosForGame.push({
        skill: inspectedSkill.skill,
        level
      });
      toDoStore.set(toDos);
    }
    inspectedSkill = null;
  };

  const showToDos = () => {
    if (location.href !== window.__settings.hostDir + `/check-list/${game}`) {
      navigate(window.__settings.hostDir + `/check-list/${game}`);
    }
  };
</script>

<style>
  .skill b {
    font-size: 1.25em;
    display: block;
  }
  .skill {
    margin-bottom: 2em;
  }
  h2 {
    border-bottom: 3px white double;
    margin: 0 0 0.2em 0;
  }
  .cat-buttons {
    margin-bottom: 1em;
  }
  .cat-buttons button {
    margin: 0.25em;
    color: black;
    cursor: pointer;
  }
  button.Weapon {
    background-color: rgb(255, 95, 95);
  }
  button.Armor {
    background-color: silver;
  }
  button.Magic {
    background-color: rgb(182, 104, 255);
  }
  button.Other {
    background-color: rgb(255, 255, 111);
  }
</style>

<Link to={window.__settings.hostDir}>&lt; Back to game list</Link>

<h2>Quick Add</h2>
{#each categories as cat}
  <div class="cat-buttons">
    {#each skillByCat
      .filter(x => x.category === cat)
      .sort(skillSorter) as skill}
      <button class={cat} on:click={() => showAdd(skill)}>{skill.skill}</button>
    {/each}
  </div>
{/each}

<h2>Full Trainer List</h2>
<button on:click={() => (trainerListVisible = !trainerListVisible)}>
  Click to
  {#if trainerListVisible}hide{:else}show{/if}
</button>

{#if trainerListVisible}
  {#each categories as cat}
    <h2>{cat}</h2>
    {#each getSkillsByCategory(cat) as skill}
      <div class="skill">
        <b>{skill.skill}</b>
        <SkillLevel level="Normal" trainers={skill.Normal} />
        <SkillLevel level="Expert" trainers={skill.Expert} />
        <SkillLevel level="Master" trainers={skill.Master} />
        <SkillLevel level="Grandmaster" trainers={skill.Grandmaster} />
      </div>
    {/each}
  {/each}
{/if}

{#if inspectedSkill}
  <AddSkillModal
    skill={inspectedSkill}
    {levels}
    on:levelClick={({ detail }) => levelClick(detail)}
    on:close={() => (inspectedSkill = null)} />
{/if}

<ToDoButton on:click={showToDos} game={game} />
