export type Priority = 'high' | 'medium' | 'low';
export type FilterStatus = 'all' | 'active' | 'completed';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  categoryId: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TodoFilters {
  status: FilterStatus;
  priority: Priority | 'all';
  categoryId: string | 'all';
  searchText: string;
}

export interface AppState {
  todos: Todo[];
  categories: Category[];
}
