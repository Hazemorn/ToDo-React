export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in_progress' | 'done';

export interface ITask {
  id: string; 
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt: string;
}