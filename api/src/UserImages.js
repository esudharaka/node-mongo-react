const mongoose = require("mongoose");

const userImages = new mongoose.Schema({
  userName: {
    type: String
  },
  selectedImages : { type : Array , "default" : [] }
});

const UserImages = mongoose.model("User", userImages);

module.exports = UserImages;
