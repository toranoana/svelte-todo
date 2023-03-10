import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import { loadTodos } from "/src/lib/storage.ts";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
  deleted: boolean;
};

export type TodosStore = {
  subscribe: Writable<Todo[]>["subscribe"];
  init: () => string;
  add: (todo: Todo) => void;
  reload: () => void;
};

const default_todos: Todo[] = [
  {
    id: 1,
    text: "Todoを用意する",
    done: false,
    deleted: false,
  },
];

function createTodosStore(defaults: Todo[] = []): TodosStore {
  const { subscribe, set, update } = writable<Todo[]>(defaults);

  const init = (): string => {
    const savedTodos = loadTodos();
    if (savedTodos.length) {
      set(savedTodos);
      return "";
    }

    return "このブラウザではToDoの保存と読み込みができません。";
  };

  const add = (todo: Todo) => {
    update((t: Todo[]) => {
      return [...t, todo];
    });
  };

  const reload = (): void => {
    update((t: Todo[]) => t);
  };

  return {
    subscribe,
    init,
    add,
    reload,
  };
}

export const todos: TodosStore = createTodosStore(default_todos);

