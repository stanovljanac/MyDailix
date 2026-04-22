import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface TaskInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onAdd: () => void;
}

export const TaskInput = ({ value, onChangeText, onAdd }: TaskInputProps) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Add a task for this day..."
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
