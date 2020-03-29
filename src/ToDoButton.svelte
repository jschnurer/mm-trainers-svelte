<script>
  import { scale } from "svelte/transition";
  import toDoStore from "./toDoStore.js";

  $: count = $toDoStore.length;
</script>

<style>
  div {
    position: fixed;
    top: 0;
    right: 0;
    margin: 0.75em 0.75em 0 0;
    cursor: pointer;
    background-color: #dedede;
    width: 2em;
    height: 2em;
  }
  span {
    display: block;
    position: absolute;
    bottom: -5px;
    right: -5px;
    color: black;
    width: 1em;
    height: 1em;
    line-height: 1em;
    text-align: center;
    background-color: greenyellow;
    border-radius: 100%;
    padding: 2px;
  }
</style>

<div class="button" on:click>
  <img src={window.__settings.hostDir + "/checklist.svg"} alt="checklist" />
  <span transition:scale>{count}</span>
</div>
