import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";
import type { ITask } from "../../store/types/types";
import { useParams } from "react-router";

async function getTasks({ signal }: { signal: AbortSignal }) {
    return api.get<ITask[]>("/items", { signal }).then((res) => res.data);
}

async function getTaskById(id: string | undefined, signal: AbortSignal) {
    const data  = await api.get<ITask>(`/items/${id}`,{ signal}).then((res) => res.data);
    return data;
}

export const useTasks = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks, 
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
        queryFn: ({ signal }) => getTaskById(id, signal),
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