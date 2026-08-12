import type { Priority, Status } from './types/types';

interface PriorityOption {
  value: Priority | Status;
  label: string;
  color?: string;
}

export const PRIORITY_OPTIONS: PriorityOption[] = [
  { value: 'low', label: 'Low', color:'var(--lowStatus)' },
  { value: 'medium', label: 'Medium', color:'var(--mediumStatus)'},
  { value: 'high', label: 'High', color:'var(--highStatus)' },
];

export const STATUS_OPTIONS: PriorityOption[] = [
  { value: 'all', label: 'All'},
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];
