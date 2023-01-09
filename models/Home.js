const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
        virtuals: true,

        transform: (_doc, ret) => {
            delete ret.password
            return ret
        }
    }
  }
);

module.exports = mongoose.model("Home", homeSchema);
