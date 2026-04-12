import { useState, useRef, useEffect } from 'react';
import type { Priority, Category } from '../../types/todo';
import { PRIORITY_OPTIONS, PRIORITY_COLORS } from '../../constants';
import { Button } from '../ui/Button';

interface TodoInputProps {
  categories: Category[];
  onAdd: (draft: {
    text: string;
    priority: Priority;
    categoryId: string | null;
    tags: string[];
  }) => void;
}

export function TodoInput({ categories, onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [categoryId, setCategoryId] = useState<string>('');
  const [tagInput, setTagInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const tags = tagInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    onAdd({
      text: trimmed,
      priority,
      categoryId: categoryId || null,
      tags,
    });

    setText('');
    setTagInput('');
    setPriority('medium');
    setCategoryId('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="새 할 일 추가... (/ 키로 포커스)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        />
        <Button type="submit" variant="primary" disabled={!text.trim()}>
          추가
        </Button>
      </div>

      <div className="flex gap-2 mt-2 flex-wrap">
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
          className="px-2 py-1 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
        >
          {PRIORITY_OPTIONS.map(p => (
            <option key={p} value={p}>
              우선순위: {PRIORITY_COLORS[p].label}
            </option>
          ))}
        </select>

        <select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          className="px-2 py-1 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
        >
          <option value="">카테고리 없음</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          placeholder="태그 (쉼표로 구분)"
          className="flex-1 min-w-32 px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
      </div>
    </form>
  );
}
