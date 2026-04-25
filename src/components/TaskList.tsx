import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onRemoveTask: (taskId: string) => void;
}

export const TaskList = ({ tasks, onRemoveTask }: TaskListProps) => {
  if (tasks.length === 0) {
    return <Text style={styles.empty}>No tasks for this date yet.</Text>;
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.taskRow}>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            {item.time ? <Text style={styles.taskMeta}>{item.time}</Text> : null}
          </View>
          <TouchableOpacity onPress={() => onRemoveTask(item.id)}>
            <Text style={styles.remove}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 12,
    gap: 8,
  },
  taskRow: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
  },
  taskContent: {
    flex: 1,
    gap: 4,
  },
  taskMeta: {
    color: "#6b7280",
    fontSize: 13,
    fontWeight: "600",
  },
  remove: {
    color: "#dc2626",
    fontWeight: "600",
    marginLeft: 12,
  },
  empty: {
    color: "#6b7280",
    marginTop: 12,
  },
});
