import type { Priority, Status } from './types/types';

interface PriorityOption {
  value: Priority | Status;
  label: string;
}

export const PRIORITY_OPTIONS: PriorityOption[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export const STATUS_OPTIONS: PriorityOption[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];
