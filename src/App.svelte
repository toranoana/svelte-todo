<script lang="ts">
  import Board from "./lib/Board.svelte";
  import { todos } from "/src/store/todo.ts";
  import type { Todo } from "/src/store/todo.ts";

  function create(input: EventTarget) {
    if (!(input instanceof HTMLInputElement)) {
      return;
    }
    if(!input.value){
      return;
    }

    const next_id = Math.max(...$todos.map((t: Todo) => t.id)) + 1;
    todos.add(<Todo>{
      id: next_id,
      text: input.value,
      done: false,
      deleted: false,
    });
    input.value = null;
  }
</script>

<main>
  <div class="form">
    <input
      placeholder="TODOを入力(Enter または ボタンで作成)"
      on:keydown={(e) => e.key === "Enter" && create(e.target)}
    />
  </div>

  <Board />
</main>

<style>
  .form > input {
    width: 95%;
    padding: 0.5em;
    font-size: 1.4em;
  }
</style>
