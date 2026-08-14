import type { ITask } from "../../store/types/types";
import { api } from "./api";


export const taskApi = {
    getTasks: ({ signal }: { signal: AbortSignal }) => api.get<ITask[]>("/items", { signal }).then((res) => res.data),
    getTaskById: (id: string | undefined, signal: AbortSignal) => api.get<ITask>(`/items/${id}`,{ signal}).then((res) => res.data), 
    postTask: (newTask: Omit<ITask, "id" | "createdAt">, signal?: AbortSignal) => api.post<ITask>(`/items`, newTask, { signal}).then((res) => res.data),
    updateTask: async (
        id: string, 
        fields: Partial<Omit<ITask, "id" | "createdAt">>
      ) => {
        const { data } = await api.put<ITask>(`/items/${id}`, { ...fields });
        return data;
      },
      deleteTask: async (id: string) => {
        await api.delete(`/items/${id}`);
        return 
    }
}   