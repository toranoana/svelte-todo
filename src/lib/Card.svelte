<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Todo } from "/src/store/todo.ts";

  export let todo: Todo;
  let checked: boolean;
  const dispatch = createEventDispatcher();

  function triggerToggleStatus() {
    dispatch("toggleStatus", {
      target: todo,
    });
  }

  function triggerRemove() {
    dispatch("remove", {
      target: todo,
    });
  }

  $: checked = todo.done;
</script>

<label class:checked>
  <input type="checkbox" bind:checked on:change={triggerToggleStatus} />
  <span class="description">{todo.text}</span>
  <button on:click={triggerRemove}>remove</button>
</label>

<style>
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 2px;

    margin-bottom: 5px;
    padding: 0.5em 1em;

    line-height: 1.2em;
    font-weight: bold;

    border-radius: 2px;
    border: 1px solid hsl(240, 50%, 80%);
    background-color: hsl(240, 50%, 85%);

    user-select: none;
  }
  label.checked {
    font-weight: normal;

    border: 1px solid hsl(240, 50%, 90%);
    background-color: hsl(240, 50%, 95%);
    color: #777;
  }
  label > input[type="checkbox"] {
    vertical-align: middle;
  }
  label > span.description {
    flex-grow: 2;
    text-align: left;
  }
  button {
  }
</style>
