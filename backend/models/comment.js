const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: String,
    wildlife_post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WildlifePost"
    },
});

module.exports = mongoose.model("Comment", commentSchema)