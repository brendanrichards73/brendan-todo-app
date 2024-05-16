import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type TodoItemProps = {
    text: string;
    onDelete: () => void;
    onDoneToggle: () => void;
    isDone: boolean;
};

export default function TodoItem({
    text,
    onDelete,
    onDoneToggle,
    isDone,
}: TodoItemProps) {
    return (
        <View style={styles.todoItem}>
            <View style={styles.textWrapper}>
                <TouchableOpacity
                    style={styles.checkBox}
                    onPress={onDoneToggle}
                >
                    {isDone && <Text style={styles.checkMark}>✔</Text>}
                </TouchableOpacity>

                <Text style={styles.itemText}>{text}</Text>
            </View>
            <TouchableOpacity
                onPress={onDelete}
                style={styles.deleteTouchableArea}
            >
                <View style={styles.deleteWrapper}>
                    <Text style={styles.deleteText}>Del</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    todoItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    textWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    checkBox: {
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
        borderWidth: 2,
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    checkMark: {
        color: "green",
        fontSize: 20,
        fontWeight: "bold",
    },
    itemText: {
        flex: 1,
        maxWidth: "80%",
        fontSize: 18,
    },
    deleteWrapper: {
        width: 45,
        height: 45,
        borderColor: "#FF0033",
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: "#FF0033",
        justifyContent: "center",
        alignItems: "center",
    },
    deleteTouchableArea: {
        padding: 10,
    },
    deleteText: {
        color: "#FFF",
        fontSize: 12,
        fontWeight: "bold",
    },
});
