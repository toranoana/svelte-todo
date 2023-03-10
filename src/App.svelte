<script lang="ts">
  import { onMount, afterUpdate } from "svelte";

  import Board from "./component/Board.svelte";
  import { saveTodos } from "/src/lib/storage.ts";
  import { todos } from "/src/store/todo.ts";
  import type { Todo } from "/src/store/todo.ts";

  let msg: string;
  let loading: boolean = true;

  onMount(async () => {
    msg = todos.init();
    await new Promise((res) => setTimeout(res, 500));
    loading = false;
  });

  afterUpdate(() => {
    saveTodos($todos);
  });

  function create(input: EventTarget) {
    if (!(input instanceof HTMLInputElement)) {
      return;
    }
    if (!input.value) {
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

  function handleCreateSubmit(e: KeyboardEvent) {
    if (e.key === "Enter" && e.shiftKey) {
      create(e.target);
    }
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  />
</svelte:head>

<main>
  <div class="form">
    <input
      placeholder="TODOを入力(Shift + Enterで作成)"
      on:keydown={handleCreateSubmit}
    />
  </div>

  {#if msg}
    <div class="message">{msg}</div>
  {/if}

  {#if loading}
    <div class="loader-container">
      <div class="loader">Loading...</div>
    </div>
  {:else}
    <Board />
  {/if}
</main>

<style>
  .form > input {
    width: 95%;
    padding: 0.5em;
    font-size: 1.4em;
  }
  .message {
    color: red;
    margin: 1em;
  }

  .loader-container {
    height: 30em;
  }

  /* https://projects.lukehaas.me/css-loaders/ */
  .loader {
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 11em;
    height: 11em;
    border-radius: 50%;
    background: #0dc6c2;
    background: -moz-linear-gradient(
      left,
      #0dc6c2 10%,
      rgba(13, 198, 194, 0) 42%
    );
    background: -webkit-linear-gradient(
      left,
      #0dc6c2 10%,
      rgba(13, 198, 194, 0) 42%
    );
    background: -o-linear-gradient(
      left,
      #0dc6c2 10%,
      rgba(13, 198, 194, 0) 42%
    );
    background: -ms-linear-gradient(
      left,
      #0dc6c2 10%,
      rgba(13, 198, 194, 0) 42%
    );
    background: linear-gradient(
      to right,
      #0dc6c2 10%,
      rgba(13, 198, 194, 0) 42%
    );
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: #0dc6c2;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  .loader:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
