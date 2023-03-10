<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Todo } from "/src/store/todo.ts";

  export let todo: Todo;

  const dispatch = createEventDispatcher();

  const triggerRevive = () => {
    dispatch("revive", {
      target: todo,
    });
  }
</script>

<label>
  {todo.text}
  <button on:click={triggerRevive}><i class="fas fa-trash-restore"></i></button>
</label>

<style>
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 0.5em;

    padding: 0.25em 0.25em 0.25em 1em;

    line-height: 1.2em;
    font-weight: 200;

    border-radius: 2px;
    border: 1px solid hsl(240, 5%, 90%);
    background-color: hsl(240, 5%, 95%);

    color: #777;

    user-select: none;
  }
  label > input[type="checkbox"] {
    vertical-align: middle;
  }
  label > span.description {
    flex-grow: 2;
    text-align: left;
  }
  button {
    font-size: 0.8em;
    padding: 0.5em 0.75em;
    border-radius: 20%;
    background: none;
  }
	button:hover {
    border-color: #777;
    background-color: white;
	}
</style>
