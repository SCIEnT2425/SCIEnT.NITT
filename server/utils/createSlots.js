const axios = require("axios");
const Slot = require("../models/Slot");

const getISTTime = async () => {
  try {
    const response = await axios.get("https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata");
    return new Date(response.data.dateTime);
  } catch (error) {
    console.error("Error fetching IST time:", error);
    return new Date();
  }
};

const createSlotsForWeek = async () => {
  try {
    console.log("Deleting existing slots...");
    await Slot.deleteMany({}); // Ensure slots are deleted
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for MongoDB to sync

    console.log("Dropping existing indices...");
    await Slot.collection.dropIndexes();
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Ensure index drop is completed

    console.log("Starting slot creation...");

    const rooms = ["Conference Hall", "New Computer Lab", "Old Computer Lab"];
    const nowIST = await getISTTime();
    const startOfWeek = new Date(nowIST.setDate(nowIST.getDate() - nowIST.getDay()));

    for (let day = 1; day < 6; day++) {
      const startOfDay = new Date(startOfWeek);
      startOfDay.setDate(startOfWeek.getDate() + day);
      startOfDay.setHours(8, 0, 0, 0);

      let slotTime = new Date(startOfDay);
      const endOfDay = new Date(startOfDay);
      endOfDay.setHours(22, 0, 0, 0);

      while (slotTime < endOfDay) {
        const slotCreationPromises = [];

        for (const room of rooms) {
          const startTime = new Date(slotTime);
          const endTime = new Date(startTime);
          endTime.setMinutes(endTime.getMinutes() + 30);

          slotCreationPromises.push(createSlot({ room, startTime, endTime }));
        }

        await Promise.all(slotCreationPromises);
        slotTime.setMinutes(slotTime.getMinutes() + 30);
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
    // console.log(✅ Slot created: ${slotData.room} at ${slotData.startTime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })});
  } catch (error) {
    if (error.code === 11000) {
      // console.warn("⚠ Duplicate slot detected, skipping:", slotData.startTime);
    } else {
      // console.error("❌ Unexpected error:", error);
    }
  }
};

module.exports = createSlotsForWeek;
