import { useCallback, useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { Task } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

let taskId = 0;

export function UseTasks() {
    const [task, setTask] = useState<string | null>(null);
    const [taskItems, setTaskItems] = useState<Task[]>([]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const value = await AsyncStorage.getItem("@tasks");
                if (value !== null) {
                    setTaskItems(JSON.parse(value));
                }
            } catch (e) {
                ("There was an error loading the tasks!");
            }
        };

        loadTasks();
    }, []);

    const handleAddItem = useCallback(async () => {
        Keyboard.dismiss();
        if (task) {
            const newTasks = [
                ...taskItems,
                { id: uuid(), text: task, done: false },
            ];
            setTaskItems(newTasks);
            setTask(null);
            try {
                await AsyncStorage.setItem("@tasks", JSON.stringify(newTasks));
            } catch (e) {
                console.error("There was an error saving the tasks!");
            }
        }
    }, [task, taskItems]);

    const deleteTask = useCallback(
        async (id: string) => {
            const newTasks = taskItems.filter((task) => task.id !== id);
            setTaskItems(newTasks);
            try {
                await AsyncStorage.setItem("@tasks", JSON.stringify(newTasks));
            } catch (e) {
                ("there was an error saving the tasks!");
            }
        },
        [taskItems]
    );

    const toggleDone = useCallback(
        async (id: string) => {
            const updatedTasks = taskItems.map((task) =>
                task.id === id ? { ...task, done: !task.done } : task
            );
            setTaskItems(updatedTasks);
            try {
                await AsyncStorage.setItem(
                    "@tasks",
                    JSON.stringify(updatedTasks)
                );
            } catch (e) {
                console.error("There was an error saving the tasks!");
            }
        },
        [taskItems]
    );

    return { task, setTask, taskItems, handleAddItem, deleteTask, toggleDone };
}
