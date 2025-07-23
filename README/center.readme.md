#  Holiday & Center Rules

## 🛑 REQUIREMENT 1: Prevent Center Deletion if Classes Exist

- A center **cannot be deleted** if it has scheduled classes.
- Enforced using:
  `FindClassByCenterId(centerId)`
- If any class exists, return `true` and block the deletion.

---

## 📅 REQUIREMENT 2: Handle Holiday Closures Automatically

### ✅ On Holiday Declaration:
1. A job is added to the queue with center ID and date.
2. The worker processes the job:
   - Cancels all classes scheduled on that date.
   - Cancels all bookings for those classes.

---

### 🔁 Cancellation Flow:

1. **Find all classes**:
   `GetCenterClassesByDate(centerId, date)`

2. **Cancel classes**:
   `CancelClassesOnHolyDay(classes)`

3. **Cancel bookings for each class**:
   `CancelBulkBookingByClassId(classes, date)`

---

### 🧩 Booking Cancellation Details:

- `CancelBulkBookingByClassId` → loops over classes.
- `CancelBookingByClassId` → finds bookings for each class.
- `CancelBulkBooking` → loops over all bookings.
- `deleteBooking` → soft-deletes each booking and updates user booking count.

