const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    totalmessages: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversations", ConversationSchema);