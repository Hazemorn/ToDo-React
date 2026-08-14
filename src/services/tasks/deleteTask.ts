import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";


async function deleteTask(id: string) {
    await api.delete(`/items/${id}`);
    return 
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: () => {
            console.log('User deletion failed');
        }
    });
};
