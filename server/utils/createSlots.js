const Slot = require('../models/Slot');

const createSlotsForWeek = async () => {
  try {
    await Slot.deleteMany({}); // Clear existing slots
    console.log("Existing slots cleared.");

    await Slot.collection.dropIndexes(); // Clear existing indices
    console.log("Existing indices dropped.");

    const rooms = ['Conference Hall', 'New Computer Lab', 'Old Computer Lab'];
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Start of this week

    for (let day = 0; day < 7; day++) {
      const startOfDay = new Date(startOfWeek);
      startOfDay.setDate(startOfWeek.getDate() + day);
      startOfDay.setHours(8, 0, 0, 0); // Start of the day (8:00 AM)

      let slotTime = new Date(startOfDay);
      const endOfDay = new Date(startOfDay);
      endOfDay.setHours(22, 0, 0, 0); // End of the day (10:00 PM)

      while (slotTime < endOfDay) {
        const slotCreationPromises = [];

        for (const room of rooms) {
          const startTime = new Date(slotTime);
          const endTime = new Date(startTime);
          endTime.setMinutes(endTime.getMinutes() + 30); // 30-minute slot

          // Prepare the slot creation promise
          slotCreationPromises.push(createSlot({ room, startTime, endTime }));
        }

        // Execute all slot creation promises concurrently
        await Promise.all(slotCreationPromises);

        // Move to the next 30-minute slot
        slotTime.setMinutes(slotTime.getMinutes() + 30);
      }
    }

    console.log("Slots for the week created successfully.");
  } catch (error) {
    console.error("Error creating slots:", error);
  }
};

const createSlot = async (slotData) => {
  try {
    const slot = new Slot(slotData);
    await slot.save();
    // console.log(`Slot created for ${slotData.room} at ${slotData.startTime}`);
  } catch (error) {
    if (error.code === 11000) {
      console.warn("Duplicate slot detected, skipping:", slotData.startTime);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

module.exports = createSlotsForWeek;
