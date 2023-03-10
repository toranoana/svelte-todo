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
  delete_overflow_trash: () => void;
};

const default_todos: Todo[] = [
  {
    id: 1,
    text: "Todoを用意する",
    done: false,
    deleted: false,
  },
];

const createTodosStore = (defaults: Todo[] = []): TodosStore => {
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

  const delete_overflow_trash = (): void => {
    update((t: Todo[]) => {
      let delete_count = t.filter((todo: Todo) => {
        return todo.deleted;
      }).length;
      return t.filter((todo: Todo) => {
        if (!todo.deleted) {
          return true;
        }
        delete_count--;
        return delete_count < 10;
      });
    });
  };

  return {
    subscribe,
    init,
    add,
    reload,
    delete_overflow_trash,
  };
};

export const todos: TodosStore = createTodosStore(default_todos);
