import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TaskType } from "../types/task";

interface TaskInputProps {
  value: string;
  onChangeText: (text: string) => void;
  timeValue: string;
  onChangeTime: (text: string) => void;
  onAdd: () => void;
  onStartAdd: () => void;
  onCancelAdd: () => void;
  isCreating: boolean;
  isPastDate: boolean;
  selectedType: TaskType;
  onChangeType: (type: TaskType) => void;
}

export const TaskInput = ({
  value,
  onChangeText,
  timeValue,
  onChangeTime,
  onAdd,
  onStartAdd,
  onCancelAdd,
  isCreating,
  isPastDate,
  selectedType,
  onChangeType,
}: TaskInputProps) => {
  const hasTitle = value.trim().length > 0;
  const needsTime = selectedType === TaskType.MUST_DO;
  const isTimeValid = /^([01]\d|2[0-3]):([0-5]\d)$/.test(timeValue.trim());
  const canSave = hasTitle && (!needsTime || isTimeValid);

  return (
    <View style={styles.wrapper}>
      {isCreating ? (
        <View style={styles.formPanel}>
          <TextInput
            style={styles.input}
            placeholder="Add a task for this day..."
            value={value}
            onChangeText={onChangeText}
            accessibilityLabel="Task title input"
            autoFocus
          />
          {hasTitle ? (
            <>
              <View style={styles.typeRow}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    selectedType === TaskType.MUST_DO && styles.typeButtonSelected,
                  ]}
                  onPress={() => onChangeType(TaskType.MUST_DO)}
                  accessibilityRole="button"
                  accessibilityLabel="Select MUST DO task type"
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      selectedType === TaskType.MUST_DO && styles.typeButtonTextSelected,
                    ]}
                  >
                    MUST DO
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    selectedType === TaskType.OPTIONAL && styles.typeButtonSelected,
                  ]}
                  onPress={() => onChangeType(TaskType.OPTIONAL)}
                  accessibilityRole="button"
                  accessibilityLabel="Select OPTIONAL task type"
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      selectedType === TaskType.OPTIONAL && styles.typeButtonTextSelected,
                    ]}
                  >
                    OPTIONAL
                  </Text>
                </TouchableOpacity>
              </View>
              {needsTime ? (
                <TextInput
                  style={styles.input}
                  placeholder="Time (HH:MM)"
                  value={timeValue}
                  onChangeText={onChangeTime}
                  keyboardType="numbers-and-punctuation"
                  maxLength={5}
                  accessibilityLabel="Task time input in 24 hour format"
                />
              ) : null}
              <Text style={styles.hint}>
                {needsTime
                  ? "MUST DO tasks require a time in HH:MM format."
                  : "Tip: Switch to MUST DO for scheduled tasks."}
              </Text>
            </>
          ) : null}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onCancelAdd}
              accessibilityRole="button"
              accessibilityLabel="Cancel adding task"
            >
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.primaryButton, !canSave && styles.buttonDisabled]}
              onPress={onAdd}
              disabled={!canSave}
              accessibilityRole="button"
              accessibilityLabel="Save new task"
            >
              <Text style={styles.primaryButtonText}>Save Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.iconButton, isPastDate && styles.buttonDisabled]}
          onPress={onStartAdd}
          disabled={isPastDate}
          accessibilityRole="button"
          accessibilityLabel={isPastDate ? "Adding task is disabled for past dates" : "Add task"}
        >
          <Text style={styles.icon}>{"\u2795"}</Text>
          <Text style={styles.iconLabel}>Add Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel="Task history placeholder"
        >
          <Text style={styles.icon}>{"\u21BA"}</Text>
          <Text style={styles.iconLabel}>History</Text>
        </TouchableOpacity>
      </View>
      {isPastDate ? <Text style={styles.hint}>Past dates are view-only. Pick Today or a future date to add tasks.</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    gap: 8,
    marginTop: 8,
    paddingBottom: 8,
  },
  formPanel: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 10,
    gap: 8,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  typeRow: {
    flexDirection: "row",
    gap: 8,
  },
  typeButton: {
    flex: 1,
    minHeight: 44,
    borderWidth: 1,
    borderColor: "#9ca3af",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  typeButtonSelected: {
    backgroundColor: "#1d4ed8",
    borderColor: "#1d4ed8",
  },
  typeButtonText: {
    fontWeight: "600",
    color: "#1f2937",
  },
  typeButtonTextSelected: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#111827",
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  hint: {
    color: "#4b5563",
    fontSize: 12,
  },
  bottomBar: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 14,
    padding: 8,
  },
  iconButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 10,
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  icon: {
    fontSize: 16,
  },
  iconLabel: {
    color: "#111827",
    fontWeight: "600",
  },
});
