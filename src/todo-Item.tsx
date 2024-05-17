import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

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
        <View style={styles.container}>
            <View style={[styles.todoItem, isDone ? styles.todoItemDone : {}]}>
                <View style={styles.textWrapper}>
                    <TouchableOpacity
                        style={styles.checkBox}
                        onPress={onDoneToggle}
                    >
                        {isDone && (
                            <Ionicons
                                name="checkmark-circle"
                                size={32}
                                color="green"
                            />
                        )}
                    </TouchableOpacity>

                    <Text style={styles.itemText}>{text}</Text>
                </View>
                {isDone && (
                    <TouchableOpacity onPress={onDelete}>
                        <View style={styles.deleteWrapper}>
                            <Text style={styles.deleteText}>Delete</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        height: "80%",
        width: "100%",
    },
    todoItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    todoItemDone: {
        backgroundColor: "#F8BBD0",
        opacity: 0.75,
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
        width: 35,
        height: 35,
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
        fontWeight: "bold",
    },
    deleteWrapper: {
        width: 60,
        height: 35,
        borderColor: "#FF0033",
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: "#FF0033",
        justifyContent: "center",
        alignItems: "center",
    },
    deleteText: {
        color: "#FFF",
        fontSize: 12,
        fontWeight: "bold",
    },
});
