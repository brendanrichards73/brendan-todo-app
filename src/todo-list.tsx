import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Task } from "./types";
import Ionicons from "@expo/vector-icons/Ionicons";

type TodoListProps = {
    taskItems: Task[];
    renderItem: ({ item }: { item: Task }) => JSX.Element;
};

export const TodoList: React.FC<TodoListProps> = ({
    taskItems,
    renderItem,
}) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}.${
        currentDate.getMonth() + 1
    }.${currentDate.getFullYear()}`;
    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                <Text style={styles.sectionTitle}>Things to do</Text>
                <Text style={styles.dateText}>{formattedDate}</Text>
            </View>
            {taskItems.length > 0 && (
                <View style={styles.doneWrapper}>
                    <Text style={styles.doneText}>Done</Text>
                    <Ionicons name="checkmark-circle" size={32} color="green" />
                </View>
            )}
            <View style={styles.itemList}>
                <FlatList
                    data={taskItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000000",
        paddingHorizontal: 10,
    },
    dateText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    titleRow: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#D3D3D3",
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#C0C0C0",
    },
    doneWrapper: {
        flexDirection: "row",
        marginLeft: 10,
        marginTop: 40,
    },
    doneText: {
        fontSize: 20,
        fontWeight: "bold",
        marginRight: 10,
    },
    itemList: {
        paddingHorizontal: 5,
        paddingVertical: 40,
    },
});
