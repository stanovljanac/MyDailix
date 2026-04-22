import { useMemo, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { DateSelector } from "../components/DateSelector";
import { TaskInput } from "../components/TaskInput";
import { TaskList } from "../components/TaskList";
import { Task, TaskType } from "../types/task";
import { addDays, formatDisplayDate, toDateKey } from "../utils/date";

type TasksByDate = Record<string, Task[]>;

export const TaskScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskInput, setTaskInput] = useState("");
  const [tasksByDate, setTasksByDate] = useState<TasksByDate>({});

  const dateKey = useMemo(() => toDateKey(selectedDate), [selectedDate]);
  const displayDate = useMemo(() => formatDisplayDate(selectedDate), [selectedDate]);
  const tasksForSelectedDate = tasksByDate[dateKey] ?? [];

  const addTask = () => {
    const title = taskInput.trim();
    if (!title) return;

    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title,
      date: dateKey,
      completed: false,
      type: TaskType.OPTIONAL,
      reminder: { enabled: false },
    };

    setTasksByDate((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] ?? []), newTask],
    }));
    setTaskInput("");
  };

  const removeTask = (taskId: string) => {
    setTasksByDate((prev) => {
      const remaining = (prev[dateKey] ?? []).filter((task) => task.id !== taskId);
      return { ...prev, [dateKey]: remaining };
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>My Day Planner</Text>
        <DateSelector
          displayDate={displayDate}
          onPrevDay={() => setSelectedDate((d) => addDays(d, -1))}
          onNextDay={() => setSelectedDate((d) => addDays(d, 1))}
          onToday={() => setSelectedDate(new Date())}
        />
        <TaskInput value={taskInput} onChangeText={setTaskInput} onAdd={addTask} />
        <TaskList tasks={tasksForSelectedDate} onRemoveTask={removeTask} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
});
