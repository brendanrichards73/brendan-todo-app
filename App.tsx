import { StyleSheet, View, Text } from "react-native";
import TodoItem from "./src/todo-Item";

export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Things To Do</Text>
                <View style={styles.todoItems}>
                    <TodoItem text={"Item 1"}></TodoItem>
                    <TodoItem text={"Item 2"}></TodoItem>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
});
