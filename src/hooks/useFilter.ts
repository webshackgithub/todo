import { useState } from 'react';
import type { TodoFilters, FilterStatus, Priority } from '../types/todo';
import { DEFAULT_FILTERS } from '../constants';

export function useFilter() {
  const [filters, setFilters] = useState<TodoFilters>(DEFAULT_FILTERS);

  const setStatus = (status: FilterStatus) =>
    setFilters(f => ({ ...f, status }));

  const setPriority = (priority: Priority | 'all') =>
    setFilters(f => ({ ...f, priority }));

  const setCategoryId = (categoryId: string | 'all') =>
    setFilters(f => ({ ...f, categoryId }));

  const setSearchText = (searchText: string) =>
    setFilters(f => ({ ...f, searchText }));

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return { filters, setStatus, setPriority, setCategoryId, setSearchText, resetFilters };
}
