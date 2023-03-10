<script lang="ts">
  import { scale } from "svelte/transition";
  import TrashedCard from "./TrashedCard.svelte";
  import type { Todo } from "/src/store/todo.ts";

  export let items: Todo[];
</script>

<div class="list">
  {#each items as item (item.id)}
    <div transition:scale={{duration: 600}} >
      <TrashedCard todo={item} on:revive />
    </div>
  {/each}
</div>

<style>
  .list {
    display: flex;
    flex-wrap: wrap;
    column-gap: 0.5em;
    row-gap: 0.5em;
  }
</style>
