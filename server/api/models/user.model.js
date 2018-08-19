const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../../config');

const roles = ['user', 'admin'];

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  username: {
    type: String,
    maxlength: 128,
    unique: true,
    index: true,
    trim: true,
  },
  role: {
    type: String,
    enum: roles,
    default: 'user',
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) return next();

    const hash = await bcrypt.hash(this.password, 16);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  token() {
    const payload = {
      exp: moment().add(config.jwtExpirationInterval, 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.sign(payload, config.jwtSecret);
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
})

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
