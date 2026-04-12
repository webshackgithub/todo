import type { Category, Priority, TodoFilters } from '../types/todo';

export const PRIORITY_OPTIONS: Priority[] = ['high', 'medium', 'low'];

export const PRIORITY_COLORS: Record<Priority, { bg: string; text: string; border: string; label: string }> = {
  high:   { bg: 'bg-red-100',    text: 'text-red-700',    border: 'border-red-300',    label: '높음' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', label: '중간' },
  low:    { bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-300',  label: '낮음' },
};

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work',     name: '업무',   color: '#6366f1' },
  { id: 'personal', name: '개인',   color: '#ec4899' },
  { id: 'shopping', name: '쇼핑',   color: '#f59e0b' },
];

export const STORAGE_KEY = 'todo-app-state';

export const DEFAULT_FILTERS: TodoFilters = {
  status:     'all',
  priority:   'all',
  categoryId: 'all',
  searchText: '',
};
