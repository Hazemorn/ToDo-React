import { create } from "zustand";
import type { ITask, Status } from "./types/types";

interface UIStore {
  currentTask: ITask | null;
  searchQuery: string;
  statusFilter: Status | "all";
  selectTask: (task: ITask | null) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: Status | "all") => void;
}

const useTaskStore = create<UIStore>((set) => ({
  currentTask: null, 
  searchQuery: "",
  statusFilter: "all",
  selectTask: (task) => set({ currentTask: task }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
}));

export default useTaskStore;