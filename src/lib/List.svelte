<script lang="ts">
  import Card from "./Card.svelte";
  import type { Todo } from "/src/store/todo.ts";

  export let items: Todo[];
</script>

<div class="list">
  {#each items as item (item.id)}
    <Card todo={item} on:toggleStatus on:remove />
  {/each}
</div>

<style>
  .list {
    min-height: 10em;
  }
</style>
