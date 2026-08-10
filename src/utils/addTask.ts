import type { ITask } from "../store/types/types";

export function addTask (newTask: ITask) {
    const savedTasks = localStorage.getItem("tasks");
    const tasksList: ITask[] = savedTasks ? JSON.parse(savedTasks) : [];
    tasksList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasksList));
    
}
