import type { Priority } from '../../types/todo';
import { PRIORITY_COLORS } from '../../constants';

interface PriorityBadgeProps {
  variant: 'priority';
  priority: Priority;
}

interface CategoryBadgeProps {
  variant: 'category';
  name: string;
  color: string;
}

type BadgeProps = PriorityBadgeProps | CategoryBadgeProps;

export function Badge(props: BadgeProps) {
  if (props.variant === 'priority') {
    const { bg, text, border, label } = PRIORITY_COLORS[props.priority];
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${bg} ${text} ${border}`}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white"
      style={{ backgroundColor: props.color }}
    >
      {props.name}
    </span>
  );
}
