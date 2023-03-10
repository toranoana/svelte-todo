<script lang="ts">
  import TrashedCard from "./TrashedCard.svelte";
  import type { Todo } from "/src/store/todo.ts";

  export let items: Todo[];
</script>

<div class="list">
  {#each items as item (item.id)}
    <TrashedCard todo={item} on:revive />
  {/each}
</div>

<style>
  .list {
    min-height: 5em;
  }
</style>
