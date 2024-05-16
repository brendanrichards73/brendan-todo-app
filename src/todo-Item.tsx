import React from "react";
import { View, Text, StyleSheet } from "react-native";

type TodoItemProps = {
    text: string;
};

export default function TodoItem({ text }: TodoItemProps) {
    return (
        <View style={styles.todoItem}>
            <Text style={styles.itemText}>{text}</Text>
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
    itemText: { maxWidth: "80%" },
});
