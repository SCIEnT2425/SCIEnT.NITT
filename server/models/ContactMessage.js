const mongoose = require("mongoose");

// A message sent through the website's Contact Us form; read in the admin portal
const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
  subject: { type: String, trim: true, maxlength: 200, default: "" },
  message: { type: String, required: true, trim: true, maxlength: 5000 },
  read: { type: Boolean, default: false },
  // Whether the notification email to the SCIEnT inbox went out
  emailed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

contactMessageSchema.index({ createdAt: -1 });

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
