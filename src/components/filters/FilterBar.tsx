import type { FilterStatus, Priority } from '../../types/todo';
import type { TodoFilters } from '../../types/todo';
import { Button } from '../ui/Button';

interface FilterBarProps {
  filters: TodoFilters;
  onSetStatus: (s: FilterStatus) => void;
  onSetPriority: (p: Priority | 'all') => void;
}

const STATUS_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: 'all',       label: '전체' },
  { value: 'active',    label: '진행' },
  { value: 'completed', label: '완료' },
];

const PRIORITY_OPTIONS: { value: Priority | 'all'; label: string }[] = [
  { value: 'all',    label: '전체' },
  { value: 'high',   label: '높음' },
  { value: 'medium', label: '중간' },
  { value: 'low',    label: '낮음' },
];

export function FilterBar({ filters, onSetStatus, onSetPriority }: FilterBarProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">상태</p>
        <div className="flex flex-wrap gap-1">
          {STATUS_OPTIONS.map(opt => (
            <Button
              key={opt.value}
              size="sm"
              variant={filters.status === opt.value ? 'active' : 'ghost'}
              onClick={() => onSetStatus(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">우선순위</p>
        <div className="flex flex-wrap gap-1">
          {PRIORITY_OPTIONS.map(opt => (
            <Button
              key={opt.value}
              size="sm"
              variant={filters.priority === opt.value ? 'active' : 'ghost'}
              onClick={() => onSetPriority(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
