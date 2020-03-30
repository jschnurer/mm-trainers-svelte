<script>
  import toDoStore from "./toDoStore.js";
  import trainers from "./skill-trainers.json";
  import { onMount } from "svelte";
  import { Link } from "svelte-routing";

  export let game = "";

  $: reqTrainers = ($toDoStore[game] || [])
    .reduce((acc, reqSkill) => {
      let ts = trainers[game].filter(
        t => t.skill === reqSkill.skill && t.level === reqSkill.level
      );
      return acc.concat(ts);
    }, []);

  $: locations = [...new Set(reqTrainers.map(x => x.location))];

  const sortSkills = (a, b) => {
    if (a.skill < b.skill) {
      return 1;
    } else if (a.skill > b.skill) {
      return -1;
    }
  };

  const removeSkill = skill => {
    let ix = $toDoStore.findIndex(
      x => x.skill === skill.skill && x.level === skill.level
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

<Link to={window.__settings.hostDir + '/trainers-list'}>
  &lt; Back to trainers
</Link>

{#each locations.sort((a, b) => (a < b ? -1 : 1)) as locName}
  <h2>{locName}</h2>
  {#each reqTrainers
    .filter(t => t.location === locName)
    .sort(sortSkills) as skill}
    <div class={skill.category}>
      <button
        class="delete-button"
        on:click={() => removeSkill(skill)}
        title="Remove from checklist">
        x
      </button>
      <span>{skill.skill} {skill.level}</span>
      <label>({skill.name})</label>
    </div>
  {/each}
{/each}
