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
  const [taskTimeInput, setTaskTimeInput] = useState("");
  const [selectedTaskType, setSelectedTaskType] = useState(TaskType.OPTIONAL);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [tasksByDate, setTasksByDate] = useState<TasksByDate>({});

  const dateKey = useMemo(() => toDateKey(selectedDate), [selectedDate]);
  const todayKey = useMemo(() => toDateKey(new Date()), []);
  const displayDate = useMemo(() => formatDisplayDate(selectedDate), [selectedDate]);
  const tasksForSelectedDate = useMemo(() => {
    const tasks = tasksByDate[dateKey] ?? [];
    return [...tasks].sort((a, b) => {
      const timeA = a.time ?? "99:99";
      const timeB = b.time ?? "99:99";
      return timeA.localeCompare(timeB);
    });
  }, [tasksByDate, dateKey]);
  const isPastDate = dateKey < todayKey;

  const addTask = () => {
    if (isPastDate) return;

    const title = taskInput.trim();
    if (!title) return;
    const normalizedTime = taskTimeInput.trim();
    if (selectedTaskType === TaskType.MUST_DO && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(normalizedTime)) {
      return;
    }

    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title,
      date: dateKey,
      completed: false,
      type: selectedTaskType,
      time: selectedTaskType === TaskType.MUST_DO ? normalizedTime : undefined,
      reminder: { enabled: false },
    };

    setTasksByDate((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] ?? []), newTask],
    }));
    setTaskInput("");
    setTaskTimeInput("");
    setSelectedTaskType(TaskType.OPTIONAL);
    setIsCreatingTask(false);
  };

  const startAddTask = () => {
    if (isPastDate) return;
    setIsCreatingTask(true);
  };

  const cancelAddTask = () => {
    setTaskInput("");
    setTaskTimeInput("");
    setSelectedTaskType(TaskType.OPTIONAL);
    setIsCreatingTask(false);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    cancelAddTask();
  };

  const goToPrevDay = () => {
    setSelectedDate((date) => addDays(date, -1));
    cancelAddTask();
  };

  const goToNextDay = () => {
    setSelectedDate((date) => addDays(date, 1));
    cancelAddTask();
  };

  const goToToday = () => {
    setSelectedDate(new Date());
    cancelAddTask();
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
          selectedDate={selectedDate}
          displayDate={displayDate}
          onPrevDay={goToPrevDay}
          onNextDay={goToNextDay}
          onToday={goToToday}
          onSelectDate={handleSelectDate}
        />
        <View style={styles.taskListContainer}>
          <TaskList tasks={tasksForSelectedDate} onRemoveTask={removeTask} />
        </View>
        <TaskInput
          value={taskInput}
          onChangeText={setTaskInput}
          timeValue={taskTimeInput}
          onChangeTime={setTaskTimeInput}
          onAdd={addTask}
          onStartAdd={startAddTask}
          onCancelAdd={cancelAddTask}
          isCreating={isCreatingTask}
          isPastDate={isPastDate}
          selectedType={selectedTaskType}
          onChangeType={setSelectedTaskType}
        />
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
  taskListContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
});
