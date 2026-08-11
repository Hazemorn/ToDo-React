export type Priority = 'none' | 'low' | 'medium' | 'high';
export type Status =  'all' | 'todo' | 'in_progress' | 'done';

export interface ITask {
  id: string; 
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt: string;
}