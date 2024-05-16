import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type TodoItemProps = {
    text: string;
};

export default function TodoItem({ text }: TodoItemProps) {
    return (
        <View style={styles.todoItem}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
                <Text style={styles.itemText}>{text}</Text>
            </View>
            <View style={styles.circle}></View>
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
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: "#55BCF6",
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: "80%",
    },
    circle: {
        width: 12,
        height: 12,
        borderColor: "#55BCF6",
        borderWidth: 2,
        borderRadius: 5,
    },
});
