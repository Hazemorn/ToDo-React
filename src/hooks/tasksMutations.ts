import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ITask } from "../store/types/types";
import { taskApi } from "../services/api/taskApi";



export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ newTask, signal }: { newTask: Omit<ITask, "id" | "createdAt">, signal?: AbortSignal }) => 
            taskApi.postTask(newTask, signal),
        onSuccess: (data) => {
            queryClient.setQueryData(["tasks"] , (oldData: ITask[]) => [...oldData, data]);
        },
        onError: () => {
            console.log('User creation failed');
        }
    });
};
  export const useUpdateTask = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ id, fields }: { id: string; fields: Partial<ITask> }) => 
        taskApi.updateTask(id, fields),
        
      onSuccess: (updatedTask) => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        queryClient.invalidateQueries({ queryKey: ["currentTask", updatedTask.id] });
      },
      onError: () => {
        console.log('User updation failed');
      }
    });
  };

  export const useDeleteTask = () => {
      const queryClient = useQueryClient();
  
      return useMutation({
          mutationFn: taskApi.deleteTask,
          onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["tasks"] });
          },
          onError: () => {
              console.log('User deletion failed');
          }
      });
  };
