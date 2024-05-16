import mongoose from "mongoose";
const { Schema } = mongoose;

const parseRecruiterDocumentSchema = new Schema(
    {
        sender: {
            type: String,
            required: true
        },
        receiver: {
            type: Schema.Types.Mixed,
            required: true
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: 'parse_recruiter_chats',
            required: true
        }
    },
    { timestamps: true } // This option should be passed as the second argument
);

export default mongoose.model('parse_recruiter_documents', parseRecruiterDocumentSchema);
