const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: String,
    comment_author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    wildlife_post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wildlife Post"
    },
});

module.exports = mongoose.model("Comment", commentSchema)