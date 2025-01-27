const Slot = require('../models/Slot');

const createSlotsForWeek = async () => {
  try {
    await Slot.deleteMany({});
    console.log("Existing slots cleared.");

    await Slot.collection.dropIndexes();
    console.log("Existing indices dropped.");

    const rooms = ['Conference Hall', 'New Computer Lab', 'Old Computer Lab'];

    // Get current date in UTC and calculate the start of the week in IST
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); 
    startOfWeek.setHours(0, 0, 0, 0); 
    const istOffset = 5 * 60 + 30; // IST is UTC+5:30
    startOfWeek.setMinutes(startOfWeek.getMinutes() + istOffset); 

    for (let day = 0; day < 7; day++) {
      const startOfDay = new Date(startOfWeek);
      startOfDay.setDate(startOfWeek.getDate() + day);
      startOfDay.setHours(8, 0, 0, 0); 

      const slotTime = new Date(startOfDay);
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

    console.log("Slots for the week created successfully.");
  } catch (error) {
    console.error("Error creating slots:", error);
  }
};

const createSlot = async (slotData) => {
  try {
    const slot = new Slot(slotData);
    await slot.save();
    // console.log(Slot created for ${slotData.room} at ${slotData.startTime});
  } catch (error) {
    if (error.code === 11000) {
      console.warn("Duplicate slot detected, skipping:", slotData.startTime);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

module.exports = createSlotsForWeek;
