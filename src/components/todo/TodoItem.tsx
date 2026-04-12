import { useState, useEffect } from 'react';
import type { Todo, Category } from '../../types/todo';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface TodoItemProps {
  todo: Todo;
  categories: Category[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function TodoItem({ todo, categories, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const category = categories.find(c => c.id === todo.categoryId);

  useEffect(() => {
    if (!confirmDelete) return;
    const timer = setTimeout(() => setConfirmDelete(false), 2000);
    return () => clearTimeout(timer);
  }, [confirmDelete]);

  const handleDeleteClick = () => {
    if (confirmDelete) {
      onDelete(todo.id);
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <div className={`
      flex items-start gap-3 p-3 rounded-lg border transition-all duration-150
      ${todo.completed ? 'bg-gray-50 border-gray-200 opacity-60' : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow-sm'}
    `}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400 cursor-pointer"
      />

      <div className="flex-1 min-w-0">
        <p className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {todo.text}
        </p>
        <div className="flex flex-wrap gap-1 mt-1">
          <Badge variant="priority" priority={todo.priority} />
          {category && (
            <Badge variant="category" name={category.name} color={category.color} />
          )}
          {todo.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-500">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-1 shrink-0">
        <Button size="sm" variant="ghost" onClick={() => onEdit(todo.id)}>
          편집
        </Button>
        <Button
          size="sm"
          variant={confirmDelete ? 'danger' : 'ghost'}
          onClick={handleDeleteClick}
        >
          {confirmDelete ? '확인?' : '삭제'}
        </Button>
      </div>
    </div>
  );
}
