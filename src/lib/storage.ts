import type { Todo } from "/src/store/todo.ts";

const localStorageKey = "svelte-deno-todos";

export const loadTodos = (): Todo[] => {
  try {
    const savedJsonTodos = localStorage.getItem(localStorageKey);
    if (savedJsonTodos) {
      const savedTodos = JSON.parse(savedJsonTodos);
      return savedTodos;
    }
    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const saveTodos = (todos: Todo[]) => {
  try {
    localStorage.clear();
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  } catch (e) {
    console.error(e);
  }
};
