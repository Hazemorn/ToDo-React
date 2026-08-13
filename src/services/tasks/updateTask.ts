import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";
import type { ITask } from "../../store/types/types";


async function updateTask(
    id: string, 
    fields: Partial<Omit<ITask, "id" | "createdAt">>, 
    signal?: AbortSignal
  ) {
    const { data } = await api.patch<ITask>(`/items/${id}`, fields, { signal });
    return data;
  }

  export const useUpdateTask = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, fields, signal }: { id: string; fields: Partial<ITask>; signal?: AbortSignal }) => 
        updateTask(id, fields, signal),
        
      onSuccess: (updatedTask) => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["currentTask", updatedTask.id] });
      },
    });
  };
