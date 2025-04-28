const Slot = require("../models/Slot");

const createSlotsForWeek = async () => {
  try {
    console.log("Deleting existing slots...");
    await Slot.deleteMany({});
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("Dropping existing indices...");
    await Slot.collection.dropIndexes();
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("Starting slot creation...");

    const rooms = ["Conference Hall", "New Computer Lab", "Old Computer Lab"];

    // Create a date object in IST
    const now = new Date();
    const nowIST = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    // Get Monday of current week in IST
    const startOfWeekIST = new Date(nowIST);
    const dayOfWeek = startOfWeekIST.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeekIST.setDate(startOfWeekIST.getDate() + diffToMonday);
    startOfWeekIST.setHours(0, 0, 0, 0);

    for (let day = 0; day <= 4; day++) {
      // Base date for the day
      const date = new Date(startOfWeekIST);
      date.setDate(startOfWeekIST.getDate() + day);

      // 2:30 AM IST = 21:00 UTC (previous day)
      const startTimeIST = new Date(date);
      startTimeIST.setUTCHours(2, 30, 0, 0); // Set to 2:30 AM IST

      // 4:30 PM IST = 11:00 UTC (same day)
      const endTimeIST = new Date(date);
      endTimeIST.setUTCHours(16, 30, 0, 0); // Set to 4:30 PM IST

      let slotTimeIST = new Date(startTimeIST);

      while (slotTimeIST < endTimeIST) {
        const slotCreationPromises = [];

        for (const room of rooms) {
          const startTimeUTC = new Date(slotTimeIST);
          const endTimeUTC = new Date(startTimeUTC);
          endTimeUTC.setMinutes(endTimeUTC.getMinutes() + 30);

          slotCreationPromises.push(createSlot({ room, startTime: startTimeUTC, endTime: endTimeUTC }));
        }

        await Promise.all(slotCreationPromises);
        slotTimeIST.setMinutes(slotTimeIST.getMinutes() + 30);
      }
    }

    console.log("Slots created successfully.");
  } catch (error) {
    console.error("Error creating slots:", error);
  }
};

const createSlot = async (slotData) => {
  try {
    const slot = new Slot(slotData);
    await slot.save();
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate slot
    } else {
      console.error("❌ Unexpected error:", error);
    }
  }
};

module.exports = createSlotsForWeek;
