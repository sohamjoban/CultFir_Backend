# 🛑 **REQUIREMENT: Handle Overbooking and Waitlist Positioning**

- **Overbooking** happens when a class is fully booked, but users still request a spot.
- To manage overbooking, when a class slot reaches 0, users are **added to the waitlist**.
- **Waitlist Position** is calculated dynamically using the `classId` and `createdAt` fields in the booking table.

---

### ✅ **How the System Works:**

1. **Overbooking Detection:**
   - If a class slot is `0`, any additional booking requests are added to the **waitlist**.
   
2. **Waitlist Position Calculation Using Indexing:**
   - **Waitlist Table**: 
     - Columns:
       - `userId`: The ID of the user added to the waitlist.
       - `classId`: The class associated with the waitlist.
       - `createdAt`: The timestamp when the user was added to the waitlist.
   
   - **Position Calculation Logic:**
     - The position for a user on the waitlist is determined by their **`createdAt`** timestamp. The **earlier** the timestamp, the **higher** the priority.
     - The position of a user is calculated as follows:
       ```plaintext
       Position = ROW_NUMBER() OVER (PARTITION BY classId ORDER BY createdAt ASC)
       ```
       This ensures that users added earlier to the waitlist have a higher priority.

---

### 🧩 **Step-by-Step Process:**

1. **Adding a User to Waitlist (when Class Is full):**
   - When a class reaches full capacity, users are added to the **waitlist**.
   - A new row is inserted into the **Waitlist Table** for each user, capturing `userId`, `classId`, and `createdAt` (timestamp of the booking request).

2. **Dynamic Position Calculation:**
   - Each user's position on the waitlist is dynamically calculated based on the `createdAt` timestamp.
   - The **earliest** `createdAt` timestamp will get **position 1**, the next earliest gets **position 2**, and so on.

3. **Waitlist Removal (Booking Cancellation):**
   - When a user cancels their booking and frees up a slot, the **first user** on the waitlist (the one with the earliest `createdAt`) is moved into the class.
   - This user’s position is automatically updated based on their `createdAt` timestamp.

---

### 📊 **Example of Class with Waitlist:**

- **Class ID**: `20` (50 slots)
- **Current Slot Usage**: 50/50 slots are full.
- **Waitlist**: 10 users have requested to be added to the waitlist.

#### Flow:
1. The class `20` is full. 10 users are added to the **waitlist**.
2. **Waitlist Table**:
   - Users are added to the waitlist with sequential `waitlistId`s based on the `createdAt` timestamp.
   
3. A user cancels a booking:
   - The first user on the waitlist (the one with the earliest `createdAt`) is moved to the class.
   - The waitlist position of remaining users is updated dynamically based on their `createdAt` timestamp.

---

### 🔧 **Key Points:**
- **Waitlist Position** is calculated dynamically using **`classId`** and **`createdAt`** fields.
- **No manual incrementing of counters**—positions are updated **dynamically** based on booking timestamps.
- The **earliest added** user to the waitlist gets the **highest priority**.

