import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";
import type { ITask } from "../../store/types/types";


async function postTask(newTask: Omit<ITask, "id" | "createdAt">, signal?: AbortSignal) {
    return api.post<ITask>(`/items`, newTask, { signal}).then((res) => res.data);
}

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ newTask, signal }: { newTask: Omit<ITask, "id" | "createdAt">, signal?: AbortSignal }) => 
            postTask(newTask, signal),
        onSuccess: (data) => {
            queryClient.setQueryData(["tasks"] , (oldData: ITask[]) => [...oldData, data]);
        },
        onError: () => {
            console.log('User creation failed');
        }
    });
};