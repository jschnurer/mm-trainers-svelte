<script>
  export let level = "";
  export let trainers = [];
</script>

<style>
  .level {
    border-bottom: 1px #ddd solid;
    display: flex;
    padding-bottom: 1em;
    margin-bottom: 1em;
  }
  label {
    width: 7em;
  }
  .trainer {
    display: inline-block;
    margin-right: 1em;
  }
  .trainer:last-child {
    margin-right: 0;
  }
  .trainer span {
    font-style: italic;
    color: #999;
  }
  .level > div {
    flex: 1;
  }
</style>

<div class={'level ' + level} on:click>
  <label>{level}</label>
  <div class="trainers-list">
    {#each trainers as trainer}
      <span class="trainer">
        {trainer.name}
        {#if trainer.location}<span>[{trainer.location}]</span>{/if}
      </span>
    {/each}
  </div>
</div>
