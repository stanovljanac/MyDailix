export enum TaskType {
  MUST_DO = "MUST_DO",
  OPTIONAL = "OPTIONAL",
}

export interface TaskReminder {
  enabled: boolean;
  minutesBefore?: number;
}

export interface Task {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  type: TaskType;
  time?: string;
  reminder?: TaskReminder;
  note?: string;
}
