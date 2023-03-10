<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Todo } from "/src/store/todo.ts";

  export let todo: Todo;

  let checked: boolean;
  const dispatch = createEventDispatcher();

  const triggerToggleStatus = () => {
    dispatch("toggleStatus", {
      target: todo,
    });
  };

  const triggerRemove = () => {
    dispatch("remove", {
      target: todo,
    });
  };

  $: checked = todo.done;
</script>

<label class:checked>
  <input type="checkbox" bind:checked on:change={triggerToggleStatus} />
  <span class="description">{todo.text}</span>
  <button on:click={triggerRemove}><i class="fas fa-trash" /></button>
</label>

<style>
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 0.5em;

    margin-bottom: 5px;
    padding: 0.5em 0.25em 0.5em 1em;

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
    padding: 0.5em 0.75em;
    border-radius: 20%;
    background: none;
  }

  button:hover {
    border-color: #777;
    background-color: white;
  }
</style>
