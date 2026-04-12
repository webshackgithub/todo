import type { Todo, TodoFilters, Priority } from '../types/todo';

const PRIORITY_RANK: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

export function applyFilters(todos: Todo[], filters: TodoFilters): Todo[] {
  let result = todos;

  if (filters.status === 'active') {
    result = result.filter(t => !t.completed);
  } else if (filters.status === 'completed') {
    result = result.filter(t => t.completed);
  }

  if (filters.priority !== 'all') {
    result = result.filter(t => t.priority === filters.priority);
  }

  if (filters.categoryId !== 'all') {
    result = result.filter(t => t.categoryId === filters.categoryId);
  }

  if (filters.searchText.trim()) {
    const q = filters.searchText.toLowerCase();
    result = result.filter(
      t =>
        t.text.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  return result;
}

export function sortTodos(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    // 미완료 우선
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    // 우선순위 high → medium → low
    const pa = PRIORITY_RANK[a.priority];
    const pb = PRIORITY_RANK[b.priority];
    if (pa !== pb) return pa - pb;
    // 최신순
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
