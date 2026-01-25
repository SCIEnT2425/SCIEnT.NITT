const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: String,
  description :{ type: String ,default: ""},
  projects:[{type:mongoose.Schema.Types.ObjectId,ref:"Project"}]
});


module.exports = mongoose.model('Club', clubSchema);
