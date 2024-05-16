import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type TodoItemProps = {
    text: string;
    onDelete: () => void;
};

export default function TodoItem({ text, onDelete }: TodoItemProps) {
    return (
        <View style={styles.todoItem}>
            <View style={styles.textWrapper}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
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
    square: {
        width: 24,
        height: 24,
        backgroundColor: "#1C2833",
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        flex: 1,
        maxWidth: "80%",
        fontSize: 18,
    },
    deleteWrapper: {
        width: 40,
        height: 40,
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
