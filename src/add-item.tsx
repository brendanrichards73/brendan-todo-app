import React from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

type AddTaskProps = {
    task: string | null;
    setTask: (task: string) => void;
    handleAddItem: () => void;
};

export const AddTask: React.FC<AddTaskProps> = ({
    task,
    setTask,
    handleAddItem,
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={"Enter task here...."}
                value={task ?? ""}
                onChangeText={(text) => setTask(text)}
                onSubmitEditing={handleAddItem}
            />
            <TouchableOpacity onPress={handleAddItem}>
                <View style={styles.addTaskWrapper}>
                    <Text style={styles.addTask}>+</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: "#a7e9fa",
    },
    input: {
        fontSize: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: 250,
        backgroundColor: "#D3D3D3",
        borderWidth: 2,
        borderColor: "#C0C0C0",
        borderRadius: 60,
    },
    addTaskWrapper: {
        width: 60,
        height: 60,
        backgroundColor: "green",
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "#C0C0C0",
        justifyContent: "center",
        alignItems: "center",
    },
    addTask: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        backgroundColor: "green",
    },
});
