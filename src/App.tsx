import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { useFilter } from './hooks/useFilter';
import { applyFilters, sortTodos } from './utils/todoHelpers';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { TodoInput } from './components/todo/TodoInput';
import { TodoList } from './components/todo/TodoList';
import { TodoEditModal } from './components/todo/TodoEditModal';
import type { Todo } from './types/todo';

export default function App() {
  const {
    todos, categories,
    addTodo, updateTodo, deleteTodo, toggleTodo,
    clearCompleted, addCategory, deleteCategory,
  } = useTodos();

  const {
    filters,
    setStatus, setPriority, setCategoryId, setSearchText, resetFilters,
  } = useFilter();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const displayedTodos = sortTodos(applyFilters(todos, filters));
  const editingTodo = editingId ? todos.find(t => t.id === editingId) : null;

  const isFiltered =
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.categoryId !== 'all' ||
    filters.searchText !== '';

  const handleSave = (id: string, changes: Partial<Todo>) => {
    updateTodo(id, changes);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        total={todos.length}
        completed={todos.filter(t => t.completed).length}
        onToggleSidebar={() => setSidebarOpen(o => !o)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar overlay */}
        <div
          className={`
            fixed inset-0 z-30 bg-black/30 md:hidden transition-opacity duration-200
            ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`
            fixed md:static z-40 md:z-auto
            w-72 md:w-64 lg:w-72 h-full md:h-auto
            bg-white border-r border-gray-200
            p-4 overflow-y-auto
            transition-transform duration-200
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <Sidebar
            todos={todos}
            categories={categories}
            filters={filters}
            onSetStatus={setStatus}
            onSetPriority={setPriority}
            onSetCategory={id => { setCategoryId(id); setSidebarOpen(false); }}
            onSetSearch={setSearchText}
            onResetFilters={resetFilters}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
            onClearCompleted={clearCompleted}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            <TodoInput categories={categories} onAdd={addTodo} />
            <TodoList
              todos={displayedTodos}
              categories={categories}
              hasFilters={isFiltered}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={setEditingId}
            />
          </div>
        </main>
      </div>

      {editingTodo && (
        <TodoEditModal
          todo={editingTodo}
          categories={categories}
          onSave={handleSave}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  );
}
