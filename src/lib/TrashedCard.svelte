<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Todo } from "/src/store/todo.ts";

  export let todo: Todo;

  const dispatch = createEventDispatcher();

  function triggerRevive() {
    dispatch("revive", {
      target: todo,
    });
  }
</script>

<label>
  {todo.text}
  <button on:click={triggerRevive}>revive</button>
</label>

<style>
</style>
