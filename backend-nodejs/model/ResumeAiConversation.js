import mongoose from 'mongoose';
const { Schema } = mongoose;

const ResumeAiConversation = new Schema(
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
ResumeAiConversation.index({ updatedAt: -1 });
export default mongoose.model('resume_ai_conversations', ResumeAiConversation);
