import React, { useCallback, useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoItem from "./src/todo-Item";
import { AddTask } from "./src/add-item";
import { TodoList } from "./src/todo-list";
import { Task } from "./src/types";

let taskId = 0;

export default function App() {
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
                { id: taskId++, text: task, done: false },
            ];
            setTaskItems(newTasks);
            setTask(null);
        }
    }, [task, taskItems]);

    const deleteTask = useCallback(
        async (id: number) => {
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

    const toggleDone = useCallback((id: number) => {
        setTaskItems((prevTaskItems) =>
            prevTaskItems.map((task) =>
                task.id === id ? { ...task, done: !task.done } : task
            )
        );
    }, []);

    const renderItem = ({ item }: { item: Task }) => (
        <TodoItem
            text={item.text}
            onDelete={() => deleteTask(item.id)}
            onDoneToggle={() => toggleDone(item.id)}
            isDone={item.done}
        />
    );

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.KeyboardAvoidingViewWrapper}
            >
                <TodoList taskItems={taskItems} renderItem={renderItem} />
                <AddTask
                    task={task}
                    setTask={setTask}
                    handleAddItem={handleAddItem}
                />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#a7e9fa",
        paddingTop: 20,
    },
    KeyboardAvoidingViewWrapper: {
        flex: 1,
        marginTop: 50,
        paddingHorizontal: 10,
    },
});
