const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { USER, ERROR_MESSAGES } = require("../constants");
const { validateEmail } = require("../helper");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: async function(email) {
          const user = await this.constructor.findOne({ email });
          return !user;
        },
        message: 'Email must be unique',
      },
    },
    settings: {
      themePreference: {
        type: String,
        enum: Object.values(USER.THEME_PREFERENCE),
        default: USER.THEME_PREFERENCE.LIGHT,
      },
      soundEffects: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  const payloadToSignToken = {
    _id: this._id,
  };
  const token = jwt.sign(payloadToSignToken, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

// userSchema.post('save', function(error, doc, next) {
//   if (error.name === 'MongoError' && error.code === 11000) {
//     console.log('IN HERE');
//     next(new Error('email must be unique'));
//   } else {
//     next(error);
//   }
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
