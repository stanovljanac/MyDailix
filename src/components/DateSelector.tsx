import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DateSelectorProps {
  displayDate: string;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
}

export const DateSelector = ({
  displayDate,
  onPrevDay,
  onNextDay,
  onToday,
}: DateSelectorProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Selected date</Text>
      <Text style={styles.dateText}>{displayDate}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={onPrevDay}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onToday}>
          <Text style={styles.buttonText}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onNextDay}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: "500",
  },
});
