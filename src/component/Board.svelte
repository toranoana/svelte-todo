<script lang="ts">
  import List from "./List.svelte";
  import TrashedList from "./TrashedList.svelte";
  import { todos } from "/src/store/todo.ts";
  import type { Todo } from "/src/store/todo.ts";

  let board_data = [
    {
      class: "todo",
      title: "TODO",
      filterFunc: (t: Todo) => !t.done && !t.deleted,
      component: List,
    },
    {
      class: "done",
      title: "DONE",
      filterFunc: (t: Todo) => t.done && !t.deleted,
      component: List,
    },
    {
      class: "trashbox",
      title: "TRASHBOX (10件まで保持できます)",
      filterFunc: (t: Todo) => t.deleted,
      wide: true,
      component: TrashedList,
    },
  ];

  const handleToggleStatus = (e: CustomEvent) => {
    toggle(e.detail.target);
  };

  const handleRemove = (e: CustomEvent) => {
    remove(e.detail.target);
  };

  const handleRevive = (e: CustomEvent) => {
    revive(e.detail.target);
  };

  const remove = (todo: Todo) => {
    todo.deleted = true;
    todos.delete_overflow_trash();
    todos.reload();
  };

  const revive = (todo: Todo) => {
    todo.deleted = false;
    todos.reload();
  };

  const toggle = (todo: Todo) => {
    todo.done = !todo.done;
    todos.reload();
  };
</script>

<div class="board">
  {#each board_data as list_data (list_data.class)}
    <div class="list-container {list_data.class}" class:wide={list_data.wide}>
      <h2>{list_data.title}</h2>
      <svelte:component
        this={list_data.component}
        items={$todos.filter(list_data.filterFunc)}
        on:toggleStatus={handleToggleStatus}
        on:remove={handleRemove}
        on:revive={handleRevive}
      />
    </div>
  {/each}
</div>

<style>
  .board {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1.5em;
    max-width: 45em;
    min-width: 45em;
    margin: 10px auto 50px;
  }
  .board > .list-container.wide {
    grid-column: 1 / 3;
  }

  @media (max-width: 45em) {
    .board {
      grid-template-columns: 1fr;
    }
    .board > .list-container.wide {
      grid-column: auto;
    }
  }
</style>
