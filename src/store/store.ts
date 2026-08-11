import { create } from "zustand";
import type { ITask, Status } from "./types/types";

interface storeTask {
  currentTask: ITask;
  tasks: ITask[];
  isLoading: boolean;
  errors: string[];
  searchQuery: string;        
  statusFilter: Status; 
  addTask: (newTask: ITask) => void;
  selectTask: (task: ITask) => void;
  filterTasks: (text: string, status: Status) => void;

  
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: Status | 'all') => void;

  getTasks: () => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, updatedFields: Partial<ITask>) => void;
}

const initialCurrentTask: ITask = {
  id: "",
  title: "",
  description: "",
  status: "todo",
  priority: "none",
  createdAt: "",
};

const useTaskStore = create<storeTask>((set) => ({
  currentTask: initialCurrentTask,
  tasks: [],
  isLoading: false,
  errors: [],
  searchQuery: '',
  statusFilter: 'all',
  addTask: (newTask) => {
    set((state) => {
      const updatedTasks = [...state.tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },
  selectTask: (task) => {
    localStorage.setItem("currentTask", JSON.stringify(task));
    set({ 
        currentTask: task
    });
  },
  getTasks: () => {
    set({ isLoading: true });
    try {
      const savedTasks = localStorage.getItem("tasks");
      const tasksList: ITask[] = savedTasks ? JSON.parse(savedTasks) : [];
      set({ tasks: tasksList, isLoading: false, errors: [] });
    } catch (error) {
      set({
        isLoading: false,
        errors: [
          error instanceof Error ? error.message : "Failed to load tasks",
        ],
      });
    }
  },
  filterTasks: ( text, status) => { //test
    set((state) => {
    const filteredTasks = state.tasks.filter((task) => {
        const matchesStatus = task.status === status;
        const matchesTitle = task.title.toLowerCase().includes(text.toLowerCase());
        const matchesDescription = task.description.toLowerCase().includes(text.toLowerCase());
        
        return matchesStatus || matchesTitle || matchesDescription;
    });
    console.log(filteredTasks);
    return {
        tasks: filteredTasks
    }
  })
},
setSearchQuery: (query) => set({ searchQuery: query }),
setStatusFilter: (status) => set({ statusFilter: status }),
  deleteTask: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      const nextCurrentTask =
        state.currentTask.id === id ? initialCurrentTask : state.currentTask;
      return {
        tasks: updatedTasks,
        currentTask: nextCurrentTask,
      };
    });
  },
  editTask: (id, updatedFields) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      const nextCurrentTask =
        state.currentTask.id === id
          ? { ...state.currentTask, ...updatedFields }
          : state.currentTask;
      return {
        tasks: updatedTasks,
        currentTask: nextCurrentTask,
      };
    });
  },
}));

export default useTaskStore;
