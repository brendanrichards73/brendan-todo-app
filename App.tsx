import React, { useCallback, useState } from "react";
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import TodoItem from "./src/todo-Item";
import { AddTask } from "./src/add-item";
import { TodoList } from "./src/todo-list";
import { Task } from "./src/types";

let taskId = 0;

export default function App() {
    const [task, setTask] = useState<string | null>(null);
    const [taskItems, setTaskItems] = useState<Task[]>([]);

    const handleAddItem = useCallback(() => {
        Keyboard.dismiss();
        if (task) {
            setTaskItems((prevTaskItems) => [
                ...prevTaskItems,
                { id: taskId++, text: task, done: false },
            ]);
            setTask(null);
        }
    }, [task]);

    const deleteTask = useCallback((id: number) => {
        setTaskItems((prevTaskItems) =>
            prevTaskItems.filter((task) => task.id !== id)
        );
    }, []);

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
