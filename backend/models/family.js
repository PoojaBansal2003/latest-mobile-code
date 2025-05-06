const mongoose = require('mongoose');

const otherDetailSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: String,
    required:true,
    enum:["patient","caregiver"]
  }
});

module.exports = mongoose.model('User', UserSchema);
