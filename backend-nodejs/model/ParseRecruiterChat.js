import mongoose from "mongoose"
const { Schema } = mongoose

const parseRecruiterChatSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },

    },
    { timestamps: true }

);


export default mongoose.model('parse_recruiter_chats', parseRecruiterChatSchema);