<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  
  export let skill = null;

  $: levels = Object.keys(skill).filter(x => x !== "Category" && x !== "name");
</script>

<style>
  .fade {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #222;
    opacity: 0.66;
  }
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #222;
    padding: 1.33em;
    -webkit-box-shadow: 0px 0px 13px 7px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 13px 7px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 13px 7px rgba(0, 0, 0, 0.75);
  }
  h2 {
    margin: 0 0 0.66em 0;
    font-size: 1.25em;
    white-space: nowrap;
  }
  .level-buttons {
    display: flex;
  }
  .level-buttons button {
    flex: auto;
    margin-right: 0.25em;
  }
  .level-buttons button:last-child {
    margin-right: 0;
  }
  .cancel-holder {
    text-align: center;
  }
  button {
    cursor: pointer;
  }
</style>

<div class="fade" />
<div class="modal">
  <h2>What level of {skill.name}?</h2>
  <div class="level-buttons">
    {#each levels as l}
      <button on:click={() => dispatch("levelClick", l) }>{l}</button>
    {/each}
  </div>
  <div class="cancel-holder">
    <button on:click={() => dispatch("close") }>Cancel</button>
  </div>
</div>
