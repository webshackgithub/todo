interface EmptyStateProps {
  hasFilters: boolean;
}

export function EmptyState({ hasFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <div className="text-5xl mb-4">{hasFilters ? '🔍' : '📋'}</div>
      <p className="text-lg font-medium text-gray-500">
        {hasFilters ? '필터에 맞는 항목이 없습니다' : '할 일이 없습니다'}
      </p>
      <p className="text-sm mt-1">
        {hasFilters ? '필터를 변경해 보세요' : '위에서 새 할 일을 추가해 보세요'}
      </p>
    </div>
  );
}
