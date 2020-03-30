<script>
  import { Link } from "svelte-routing";
</script>

<style>
  :global(.game-selection a) {
    display: block;
    font-size: 1.5em;
  }
</style>

<h2>Might and Magic Trainers</h2>
<div class="game-selection">
<Link to={window.__settings.hostDir + "/trainers-list/mm6"}>Might & Magic VI: The Mandate of Heaven</Link>
<Link to={window.__settings.hostDir + "/trainers-list/mm7"}>Might & Magic VII: For Blood and Honor</Link>
<Link to={window.__settings.hostDir + "/trainers-list/mm8"}>Might & Magic VIII: Day of the Destroyer</Link>
</div>