<script lang="ts">
  import { slide, scale } from "svelte/transition";
  import { quintIn } from "svelte/easing";
  import { crossfade } from "svelte/transition";

  import { flip } from "svelte/animate";

  import Card from "./Card.svelte";
  import type { Todo } from "/src/store/todo.ts";
  export let items: Todo[];
</script>

<div class="list">
  {#each items as item (item.id)}
    <div in:slide={{duration: 600}} out:scale={{duration: 600}} animate:flip={{ duration: 200 }}>
      <Card todo={item} on:toggleStatus on:remove />
    </div>
  {/each}
</div>

<style>
  .list {
    min-height: 20em;
  }
</style>
