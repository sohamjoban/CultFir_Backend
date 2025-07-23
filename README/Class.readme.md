# 📌 REQUIREMENT: Single Class And Recurring Class Handling

## 🧍 Single Class

### ✅ 1. Avoid Class Time Conflicts

- A new class must **not overlap** with existing classes at the same center.
- This is checked using:
  ```ts
  FindConflictClassByDates(startDate, endDate, centerId)
  ```
- Logic:
  - For each existing class at the center:
    - If `existing.start < new.end` **AND**
    - `existing.end > new.start`, a conflict exists.
- To avoid **tight scheduling**, we add a **10-minute buffer**:
  - Subtract 10 mins from new class `startTime`
  - Add 10 mins to new class `endTime`
  - This ensures a safe gap between classes

---

### ✅ 2. Avoid Scheduling on Holidays

- A class should not be scheduled on a **holiday**.
- Each holiday is linked to a specific `centerId` and `date`.
- Just check if the given date is marked as a holiday for that center.

---

## 🔁 Recurring Class

- Recurring classes happen on **specific days of the week** (e.g., Mon, Wed, Fri).
- To generate all class dates:
  - Use the `rrule` package.
  - Input:
    - Start date
    - End date
    - Days of the week
  - Output:
    - List of all matching dates

- Once you have the dates:
  - **Loop through each date** and create a **Single Class**.
  - This ensures:
    - Holiday checks apply to each occurrence
    - Time conflict logic runs for each date


