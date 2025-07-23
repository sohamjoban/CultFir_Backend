# Booking Requirement: Double Booking Prevention

## 🛑 **REQUIREMENT: Double Booking of Same Class Must Fail**
To prevent double booking of the same class, we use the **Idempotency Key** (IdemKey).

### ✅ **How it Works:**
1. When a user sends a booking request:
   - We store the request data in **Redis**.
   - Generate a unique **Idempotency Key** (IdemKey) for the request.
   - Store the IdemKey in Redis and return it to the user.

2. **Avoid Giving More Idem Keys than Available Slots:**
   - **Do not subtract the class slot immediately** because the user might not confirm the booking.
   - Instead, store two values in Redis:
     - `totalSlot`: Represents the total available slots for the class.
     - `UsedSlotByIdem`: Tracks the number of IdemKeys already given to users.

3. **Booking Request Flow:**
   - When a new request is made, we increase the `UsedSlotByIdem` count by 1.
   - Before providing a new IdemKey, we check the available slots:
     - If `totalSlot - UsedSlotByIdem <= 0`, it means all slots are taken, and we reject the booking request.
   - If slots are available, we provide the IdemKey and store it in Redis.

4. **Booking Confirmation:**
   - Once the user confirms the booking:
     - We reduce both `totalSlot` and `UsedSlotByIdem` by 1 in Redis to reflect the confirmed booking.

5. **Removing Old IdemKey:**
   - If the user cancels or the booking is invalidated, we remove the old IdemKey from Redis.
   - A **background job** periodically runs to clean up expired IdemKeys and decrease `UsedSlotByIdem` by 1 for each removed IdemKey.
