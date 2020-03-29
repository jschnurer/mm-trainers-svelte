<script>
  import toDoStore from "./toDoStore.js";
  import trainers from "./skill-trainers.json";
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";

  $: locationData = 
    $toDoStore.reduce((acc, reqSkill) => {
      let skill = trainers.mm7[reqSkill.name];
      let trainerLocs = skill[reqSkill.level];

      trainerLocs.forEach(t => {
        if (!acc[t.location]) {
          acc[t.location] = {};
        }

        let loc = acc[t.location];

        if (!loc.skills) {
          loc.skills = [];
        }

        loc.skills.push({
          ...reqSkill,
          trainer: t.name,
          category: skill.Category
        });
      });

      return acc;
    }, []);

  const sortSkills = (a, b) => {
    if (a.skill < b.skill) {
      return 1;
    } else if (a.skill > b.skill) {
      return -1;
    }
  };

  const removeSkill = skill => {
    let ix = $toDoStore.findIndex(
      x => x.name === skill.name && x.level === skill.level
    );

    toDoStore.set($toDoStore.filter((x, iix) => iix !== ix));
  };
</script>

<style>
  label,
  span {
    display: inline-block;
  }
  label {
    font-style: italic;
    color: #888;
  }
  :global(a) {
    color: white !important;
    text-decoration: underline;
  }
  .Weapon {
    color: rgb(255, 95, 95);
  }
  .Armor {
    color: silver;
  }
  .Magic {
    color: rgb(182, 104, 255);
  }
  .Other {
    color: rgb(255, 255, 111);
  }
  h2 {
    margin-bottom: 0.25em;
    border-bottom: 3px #ddd double;
  }
  .delete-button {
    padding: 0.15em 0.33em;
    color: rgb(204, 0, 0);
    cursor: pointer;
  }
</style>

<Link to={window.__settings.hostDir + "/trainers-list"}>&lt; Back to trainers</Link>

{#each Object.keys(locationData).sort((a, b) => (a < b ? -1 : 1)) as locName}
  <h2>{locName}</h2>
  {#each locationData[locName].skills.sort(sortSkills) as skill}
    <div class={skill.category}>
      <button
        class="delete-button"
        on:click={() => removeSkill(skill)}
        title="Remove from checklist">
        x
      </button>
      <span>{skill.name} {skill.level}</span>
      <label>({skill.trainer})</label>
    </div>
  {/each}
{/each}
