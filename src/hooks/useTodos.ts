import { useState, useEffect } from 'react';
import type { Todo, Category, AppState, Priority } from '../types/todo';
import { localStorageUtil } from '../utils/localStorage';
import { DEFAULT_CATEGORIES, STORAGE_KEY } from '../constants';

const initialState: AppState = {
  todos: [],
  categories: DEFAULT_CATEGORIES,
};

export function useTodos() {
  const [state, setState] = useState<AppState>(() =>
    localStorageUtil.load<AppState>(STORAGE_KEY, initialState)
  );

  useEffect(() => {
    localStorageUtil.save(STORAGE_KEY, state);
  }, [state]);

  const addTodo = (draft: {
    text: string;
    priority: Priority;
    categoryId: string | null;
    tags: string[];
  }) => {
    const now = new Date().toISOString();
    const todo: Todo = {
      id: crypto.randomUUID(),
      completed: false,
      createdAt: now,
      updatedAt: now,
      ...draft,
    };
    setState(s => ({ ...s, todos: [todo, ...s.todos] }));
  };

  const updateTodo = (id: string, changes: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setState(s => ({
      ...s,
      todos: s.todos.map(t =>
        t.id === id ? { ...t, ...changes, updatedAt: new Date().toISOString() } : t
      ),
    }));
  };

  const deleteTodo = (id: string) => {
    setState(s => ({ ...s, todos: s.todos.filter(t => t.id !== id) }));
  };

  const toggleTodo = (id: string) => {
    setState(s => ({
      ...s,
      todos: s.todos.map(t =>
        t.id === id
          ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() }
          : t
      ),
    }));
  };

  const clearCompleted = () => {
    setState(s => ({ ...s, todos: s.todos.filter(t => !t.completed) }));
  };

  const addCategory = (name: string, color: string): Category => {
    const category: Category = { id: crypto.randomUUID(), name, color };
    setState(s => ({ ...s, categories: [...s.categories, category] }));
    return category;
  };

  const deleteCategory = (id: string) => {
    setState(s => ({
      categories: s.categories.filter(c => c.id !== id),
      todos: s.todos.map(t =>
        t.categoryId === id ? { ...t, categoryId: null } : t
      ),
    }));
  };

  return {
    todos: state.todos,
    categories: state.categories,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    addCategory,
    deleteCategory,
  };
}
