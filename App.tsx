import React, { useCallback, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    TouchableOpacity,
    Keyboard,
    FlatList,
} from "react-native";
import TodoItem from "./src/todo-Item";

type Task = {
    id: number;
    text: string;
    done: boolean;
};

let taskId = 0;

export default function App() {
    const [task, setTask] = useState<string | null>(null);
    const [taskItems, setTaskItems] = useState<Task[]>([]);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}.${
        currentDate.getMonth() + 1
    }.${currentDate.getFullYear()}`;

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
            <View style={styles.tasksWrapper}>
                <View style={styles.titleRow}>
                    <Text style={styles.sectionTitle}>Todays 2-Do's!</Text>
                    <Text style={styles.dateText}>{formattedDate}</Text>
                </View>
                <View style={styles.todoItems}>
                    {taskItems.length > 0 && (
                        <Text style={styles.doneTitle}>Done (✔)</Text>
                    )}
                    <FlatList
                        data={taskItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput
                    style={styles.input}
                    placeholder={"Enter task here...."}
                    value={task ?? ""}
                    onChangeText={(text) => setTask(text)}
                />
                <TouchableOpacity onPress={() => handleAddItem()}>
                    <View style={styles.addTaskWrapper}>
                        <Text style={styles.addTask}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#a7e9fa",
    },
    titleRow: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: "#C0C0C0",
    },
    dateText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000000",
    },
    doneTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    tasksWrapper: {
        paddingTop: 100,
        paddingBottom: 200,
        paddingHorizontal: 20,
    },
    todoItems: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        bottom: 30,
        width: "100%",
    },
    input: {
        fontSize: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: 250,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#C0C0C0",
        borderRadius: 60,
    },
    addTaskWrapper: {
        width: 60,
        height: 60,
        backgroundColor: "#2ec1e6",
        borderRadius: 60,
        borderWidth: 1,
        borderColor: "#0e0f0f",
        justifyContent: "center",
        alignItems: "center",
    },
    addTask: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#0e0f0f",
        backgroundColor: "#2ec1e6",
    },
});
