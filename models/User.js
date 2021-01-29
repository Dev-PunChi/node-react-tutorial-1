const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRound = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// save 함수가 호출되기전... mongoose 의 기능을 사용.
userSchema.pre("save", function (next) {
  const user = this;
  // 비밀번호를 바꿀때만 암호화한다.
  if (user.isModified("password")) {
    // 비밀번호 암호화.
    bcrypt.genSalt(saltRound, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
