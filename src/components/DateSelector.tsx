import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";

interface DateSelectorProps {
  selectedDate: Date;
  displayDate: string;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  onSelectDate: (date: Date) => void;
}

export const DateSelector = ({
  selectedDate,
  displayDate,
  onPrevDay,
  onNextDay,
  onToday,
  onSelectDate,
}: DateSelectorProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowPicker(false);
    if (event.type === "dismissed" || !date) return;
    onSelectDate(date);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Selected date</Text>
      <Text style={styles.dateText}>{displayDate}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={onToday}
          accessibilityRole="button"
          accessibilityLabel="Go to today"
        >
          <Text style={styles.buttonText}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onNextDay}
          accessibilityRole="button"
          accessibilityLabel="Go to next day"
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowPicker(true)}
          accessibilityRole="button"
          accessibilityLabel="Open calendar date picker"
        >
          <Text style={styles.buttonText}>Calendar</Text>
          <Text style={styles.icon} accessibilityElementsHidden>
            {"\u{1F4C5}"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onPrevDay}
          accessibilityRole="button"
          accessibilityLabel="Go to previous day"
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
      </View>
      {showPicker ? (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    backgroundColor: "#e5e7eb",
    minHeight: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  buttonText: {
    fontWeight: "500",
  },
  icon: {
    fontSize: 16,
  },
});
