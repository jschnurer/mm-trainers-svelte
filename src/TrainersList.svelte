<script>
  import trainers from "./skill-trainers.json";
  import SkillLevel from "./SkillLevel.svelte";
  import toDoStore from "./toDoStore.js";
  import AddSkillModal from "./AddSkillModal.svelte";

  let inspectedSkill = null;

  $: skillNames = Object.keys(trainers.mm7);
  $: skills = skillNames.map(sn => ({
    ...trainers.mm7[sn],
    name: sn
  }));
  $: categories = [
    ...new Set(skillNames.map(name => trainers.mm7[name].Category))
  ];

  const skillSorter = (a, b) => (a.name < b.name ? -1 : 1);

  const showAdd = skill => {
    inspectedSkill = skill;
  };

  const levelClick = level => {
    let toDos = [...$toDoStore];
    let skill = toDos.find(
      x => x.name === inspectedSkill.name && x.level === level
    );

    if (!skill) {
      toDos.push({
        name: inspectedSkill.name,
        level
      });
      toDoStore.set(toDos);
    }
    inspectedSkill = null;
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

<h2>Quick Add</h2>
{#each categories as cat}
  <div class="cat-buttons">
    {#each skills.filter(x => x.Category === cat).sort(skillSorter) as skill}
      <button class={cat} on:click={() => showAdd(skill)}>{skill.name}</button>
    {/each}
  </div>
{/each}

{#each categories as cat}
  <h2>{cat}</h2>
  {#each skills.filter(x => x.Category === cat).sort(skillSorter) as skill}
    <div class="skill">
      <b>{skill.name}</b>
      <SkillLevel level="Normal" trainers={skill.Normal} />
      <SkillLevel level="Expert" trainers={skill.Expert} />
      <SkillLevel level="Master" trainers={skill.Master} />
      <SkillLevel level="Grandmaster" trainers={skill.Grandmaster} />
    </div>
  {/each}
{/each}

{#if inspectedSkill}
  <AddSkillModal
    skill={inspectedSkill}
    on:levelClick={({ detail }) => levelClick(detail)}
    on:close={() => (inspectedSkill = null)} />
{/if}
