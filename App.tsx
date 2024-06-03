import React from "react";
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
    FlatList,
} from "react-native";
import TodoItem from "./src/todo-Item";
import { AddTask } from "./src/add-item";
import { TodoList } from "./src/todo-list";
import { Task } from "./src/types";
import { UseTasks } from "./src/use-tasks";

export default function App() {
    const flatListRef = React.useRef<FlatList>(null);
    const { task, setTask, taskItems, handleAddItem, deleteTask, toggleDone } =
        UseTasks(flatListRef);

    const renderItem = ({ item }: { item: Task }) => {
        return (
            <TodoItem
                text={item.text}
                onDelete={() => deleteTask([item.id])}
                onDoneToggle={() => toggleDone(item.id)}
                isDone={item.done}
            />
        );
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.KeyboardAvoidingViewWrapper}
            >
                <TodoList
                    taskItems={taskItems}
                    renderItem={renderItem}
                    flatListRef={flatListRef}
                />
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
