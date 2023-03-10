import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
  deleted: boolean;
};

export type TodosStore = {
  subscribe: Writable<Todo[]>["subscripbe"];
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
  const { subscribe, update } = writable<Todo[]>(defaults);

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
    add,
    reload,
  };
}

export const todos: TodosStore = createTodosStore(default_todos);
