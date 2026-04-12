import { useState, useEffect } from 'react';
import type { Todo, Category, Priority } from '../../types/todo';
import { PRIORITY_OPTIONS, PRIORITY_COLORS } from '../../constants';
import { Button } from '../ui/Button';

interface TodoEditModalProps {
  todo: Todo;
  categories: Category[];
  onSave: (id: string, changes: Partial<Todo>) => void;
  onClose: () => void;
}

export function TodoEditModal({ todo, categories, onSave, onClose }: TodoEditModalProps) {
  const [text, setText] = useState(todo.text);
  const [priority, setPriority] = useState<Priority>(todo.priority);
  const [categoryId, setCategoryId] = useState<string>(todo.categoryId ?? '');
  const [tagInput, setTagInput] = useState(todo.tags.join(', '));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const tags = tagInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    onSave(todo.id, {
      text: trimmed,
      priority,
      categoryId: categoryId || null,
      tags,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">할 일 편집</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            autoFocus
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex gap-2">
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as Priority)}
              className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
            >
              {PRIORITY_OPTIONS.map(p => (
                <option key={p} value={p}>
                  {PRIORITY_COLORS[p].label}
                </option>
              ))}
            </select>

            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
            >
              <option value="">카테고리 없음</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            placeholder="태그 (쉼표로 구분)"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />

          <div className="flex gap-2 justify-end mt-1">
            <Button type="button" variant="ghost" onClick={onClose}>
              취소
            </Button>
            <Button type="submit" variant="primary" disabled={!text.trim()}>
              저장
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
