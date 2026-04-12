import { useState } from 'react';
import type { Todo, Category, TodoFilters, FilterStatus, Priority } from '../../types/todo';
import { FilterBar } from '../filters/FilterBar';
import { Button } from '../ui/Button';

interface SidebarProps {
  todos: Todo[];
  categories: Category[];
  filters: TodoFilters;
  onSetStatus: (s: FilterStatus) => void;
  onSetPriority: (p: Priority | 'all') => void;
  onSetCategory: (id: string | 'all') => void;
  onSetSearch: (q: string) => void;
  onResetFilters: () => void;
  onAddCategory: (name: string, color: string) => void;
  onDeleteCategory: (id: string) => void;
  onClearCompleted: () => void;
}

export function Sidebar({
  todos,
  categories,
  filters,
  onSetStatus,
  onSetPriority,
  onSetCategory,
  onSetSearch,
  onResetFilters,
  onAddCategory,
  onDeleteCategory,
  onClearCompleted,
}: SidebarProps) {
  const [newCatName, setNewCatName] = useState('');
  const [newCatColor, setNewCatColor] = useState('#6366f1');
  const [showCatForm, setShowCatForm] = useState(false);

  const hasCompleted = todos.some(t => t.completed);
  const isFiltered =
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.categoryId !== 'all' ||
    filters.searchText !== '';

  const getCategoryCount = (id: string) => todos.filter(t => t.categoryId === id).length;

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newCatName.trim();
    if (!name) return;
    onAddCategory(name, newCatColor);
    setNewCatName('');
    setNewCatColor('#6366f1');
    setShowCatForm(false);
  };

  return (
    <aside className="flex flex-col gap-5">
      {/* 검색 */}
      <div>
        <input
          type="text"
          value={filters.searchText}
          onChange={e => onSetSearch(e.target.value)}
          placeholder="검색..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* 필터 */}
      <FilterBar filters={filters} onSetStatus={onSetStatus} onSetPriority={onSetPriority} />

      {/* 카테고리 */}
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">카테고리</p>
        <div className="space-y-1">
          <button
            onClick={() => onSetCategory('all')}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-colors cursor-pointer
              ${filters.categoryId === 'all' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <span>전체</span>
            <span className="text-xs text-gray-400">{todos.length}</span>
          </button>
          {categories.map(cat => (
            <div key={cat.id} className="flex items-center group">
              <button
                onClick={() => onSetCategory(cat.id)}
                className={`flex-1 flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors cursor-pointer
                  ${filters.categoryId === cat.id ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="flex-1 text-left truncate">{cat.name}</span>
                <span className="text-xs text-gray-400">{getCategoryCount(cat.id)}</span>
              </button>
              <button
                onClick={() => onDeleteCategory(cat.id)}
                className="ml-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 text-xs px-1 transition-opacity cursor-pointer"
                title="카테고리 삭제"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {showCatForm ? (
          <form onSubmit={handleAddCategory} className="mt-2 flex flex-col gap-1.5">
            <div className="flex gap-1.5">
              <input
                type="text"
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                placeholder="카테고리 이름"
                autoFocus
                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
              <input
                type="color"
                value={newCatColor}
                onChange={e => setNewCatColor(e.target.value)}
                className="w-8 h-7 rounded border border-gray-300 cursor-pointer"
              />
            </div>
            <div className="flex gap-1">
              <Button type="submit" size="sm" variant="primary" className="flex-1">추가</Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setShowCatForm(false)}>취소</Button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowCatForm(true)}
            className="mt-1.5 w-full text-xs text-indigo-600 hover:text-indigo-800 py-1 cursor-pointer text-left px-2"
          >
            + 카테고리 추가
          </button>
        )}
      </div>

      {/* 액션 */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-200">
        {isFiltered && (
          <Button size="sm" variant="ghost" onClick={onResetFilters} className="w-full justify-center">
            필터 초기화
          </Button>
        )}
        {hasCompleted && (
          <Button size="sm" variant="danger" onClick={onClearCompleted} className="w-full justify-center">
            완료 항목 삭제
          </Button>
        )}
      </div>
    </aside>
  );
}
