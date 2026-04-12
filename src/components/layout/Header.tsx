interface HeaderProps {
  total: number;
  completed: number;
  onToggleSidebar: () => void;
}

export function Header({ total, completed, onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 cursor-pointer"
          aria-label="사이드바 토글"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-900">
          <span className="text-indigo-600">✓</span> Todo
        </h1>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>
          완료 <span className="font-semibold text-gray-700">{completed}</span>
          <span className="mx-1">/</span>
          전체 <span className="font-semibold text-gray-700">{total}</span>
        </span>
        {total > 0 && (
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${total === 0 ? 0 : Math.round((completed / total) * 100)}%` }}
            />
          </div>
        )}
      </div>
    </header>
  );
}
