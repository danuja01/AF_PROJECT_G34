const mongoose = require('mongoose')

const userSchemea = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  roles: {
    type: String,
    default: 'Client'
  },
  active: {
    type: Boolean,
    default: true
  }
})
export const User = mongoose.models.User || mongoose.model('User', userSchemea)
