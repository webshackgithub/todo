import type { Todo, Category } from '../../types/todo';
import { TodoItem } from './TodoItem';
import { EmptyState } from '../ui/EmptyState';

interface TodoListProps {
  todos: Todo[];
  categories: Category[];
  hasFilters: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function TodoList({ todos, categories, hasFilters, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState hasFilters={hasFilters} />;
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          categories={categories}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
