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
} from "react-native";
import TodoItem from "./src/todo-Item";

type Task = string;

export default function App() {
    const [task, setTask] = useState<Task | null>(null);
    const [taskItems, setTaskItems] = useState<Task[]>([]);

    const handleAddItem = useCallback(() => {
        Keyboard.dismiss();
        if (task) {
            setTaskItems((prevTaskItems) => [...prevTaskItems, task]);
            setTask(null);
        }
    }, [task]);

    const deleteTask = useCallback((index: number) => {
        setTaskItems((prevTaskItems) => {
            const itemsCopy = [...prevTaskItems];
            itemsCopy.splice(index, 1);
            return itemsCopy;
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Things To Do</Text>
                <View style={styles.todoItems}>
                    {taskItems.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => deleteTask(index)}
                            >
                                <TodoItem text={item} />
                            </TouchableOpacity>
                        );
                    })}
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
        backgroundColor: "#D5D8DC",
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: "bold",
    },
    tasksWrapper: {
        paddingTop: 100,
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
        bottom: 60,
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
        backgroundColor: "#D4EFDF",
        borderRadius: 60,
        borderWidth: 1,
        borderColor: "#4CAF50",
        justifyContent: "center",
        alignItems: "center",
    },
    addTask: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#4CAF50",
        backgroundColor: "#D4EFDF",
    },
});
