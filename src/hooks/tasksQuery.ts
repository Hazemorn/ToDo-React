import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useParams } from "react-router";
import type { ITask } from "../store/types/types";
import { taskApi } from "../services/api/taskApi";

export const useTasks = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: taskApi.getTasks, 
        staleTime: 1000 * 60 * 5,
        retry: 1,
        retryDelay: 5000,
    });
}

export const useTaskDetail = () => {
    const {id} = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    return useQuery<ITask, Error>({
        queryKey: ["currentTask", id],
        queryFn: ({ signal }) => taskApi.getTaskById(id, signal),
        staleTime: 1000 * 60 * 5, 
        retry: 1,
        retryDelay: 5000,
        enabled: !!id, 
        placeholderData: () => {
            const tasks = queryClient.getQueryData<ITask[]>(["tasks"]);
            return tasks?.find((task) => task.id === id);
          }
    });
}