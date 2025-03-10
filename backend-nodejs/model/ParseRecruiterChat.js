import mongoose from "mongoose"
const { Schema } = mongoose

const parseRecruiterChatSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        deleted: {
            type: Boolean,
            required: true,
            default: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            index: true
        },
    },
    { timestamps: true }

);

parseRecruiterChatSchema.index({updatedAt: -1})
export default mongoose.model('parse_recruiter_chats', parseRecruiterChatSchema);