You are a senior mobile software engineer specializing in React Native and Expo. Your task is to help me design and build a mobile application from scratch based on the following product requirements.

I am a beginner developer, so you must:

* Explain decisions clearly but briefly
* Build the app step-by-step
* Avoid overengineering
* Focus on clean, scalable architecture
* Always provide working code

---

## 📱 APP CONCEPT

The application is a hybrid between:

* Calendar
* To-do list
* Reminder system

The app should be mobile-first and built using:

* React Native
* Expo

It must support both Android and iOS.

---

## 🧩 CORE FEATURES

### 1. Date-based task system

* User can select:

  * Year
  * Month
  * Day
* Each day has its own list of tasks

---

### 2. Two types of tasks

Each task belongs to one of two categories:

1. MUST DO (mandatory)

   * Scheduled obligations (appointments, events)
   * These can have reminders (notifications)

2. OPTIONAL (flexible)

   * Tasks that are desirable but not required

---

### 3. Task creation

Each task should include:

* Title
* Type (MUST DO / OPTIONAL)
* Date
* Optional time (for reminders)
* Optional reminder setting:

  * Disabled by default
  * If enabled:

    * User selects how long before (e.g. 10 min, 20 min, 1 hour)

---

### 4. Daily review feature

The app should support a "review mode":

* Evening review:

  * View tasks for the next day

* Morning review:

  * View tasks for the current day

This should be a dedicated screen or modal.

---

### 5. Notifications (important)

* Only MUST DO tasks can trigger notifications
* Notification should say something like:
  "Reminder: You have [task title] at [time]"
* Trigger based on selected offset (e.g. 20 minutes before)

---

### 6. Task completion

* Tasks can be marked as completed (checkbox)
* Completed tasks should be visually different

---

### 7. Task rescheduling

User must be able to:

* Move task to another day
* Change time
* Example use cases:

  * Event canceled → move to another day
  * Appointment delayed → move by 30 minutes

---

### 8. Data persistence

* Use local storage (AsyncStorage)
* No backend for now
* Data must persist between app restarts

---

## 🏗️ TECHNICAL REQUIREMENTS

Use:

* Expo
* React Native
* Functional components
* Hooks (useState, useEffect)
* Clean folder structure

Suggested structure:

/src
/screens
/components
/context
/utils

---

## 🧠 DEVELOPMENT STRATEGY

You must guide me in phases:

### Phase 1:

* Basic app setup
* Simple task list per day
* Add/remove tasks

### Phase 2:

* Task types (MUST DO / OPTIONAL)
* UI improvements
* Replace Previous/Today/Next navigation with calendar-first date picker
* Keep focus on today and future tasks; make past-task access optional/subtle
* Add quick "Tomorrow" shortcut for planning next-day work
* Replace deprecated SafeAreaView usage with react-native-safe-area-context

### Phase 3:

* Local storage (AsyncStorage)
* Add retention policy: keep up to 30 days of past tasks, auto-clean older data

### Phase 4:

* Notifications (Expo Notifications)
* Enforce that only MUST DO tasks can schedule notifications
* Validate reminder inputs and permission handling before scheduling

### Phase 5:

* Task rescheduling
* Ensure reminder schedule is updated/cancelled when task date/time changes

### Phase 6:

* Daily review feature
* Add dedicated review mode for Morning (Today) and Evening (Tomorrow)
* Improve naming/entry points so users understand review intent quickly

### Phase 7:

* Performance optimization and security hardening
* Measure startup/interactions and reduce avoidable re-renders
* Add input validation and safe local data handling checks

### Phase 8:

* Full QA test phase
* End-to-end regression on Android and iOS before release

---

## ⚠️ IMPORTANT RULES

* Do NOT generate the entire app at once

* Work step-by-step

* After each step:

  * Explain what we built
  * Ask me to confirm before continuing

* Keep code clean and minimal

* Avoid unnecessary libraries

---

## 🚀 FIRST TASK

Start with Phase 1:

* Initialize Expo app
* Create a simple screen with:

  * Selected date display
  * Input field
  * Button to add task
  * List of tasks for that date

Then wait for my confirmation before continuing.
