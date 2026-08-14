import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";
import type { ITask } from "../../store/types/types";


async function updateTask(
  id: string, 
  fields: Partial<Omit<ITask, "id" | "createdAt">>
) {
  const { data } = await api.put<ITask>(`/items/${id}`, { ...fields });
  return data;
}

  export const useUpdateTask = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, fields }: { id: string; fields: Partial<ITask> }) => 
        updateTask(id, fields),
        
      onSuccess: (updatedTask) => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["currentTask", updatedTask.id] });
      },
      onError: () => {
        console.log('User updation failed');
      }
    });
  };
