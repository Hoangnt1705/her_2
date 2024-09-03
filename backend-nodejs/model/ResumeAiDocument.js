import mongoose from "mongoose";
const { Schema } = mongoose;

const resumeAiDocument = new Schema(
    {
        myself_information: {
            type: String,
            required: true
        },
        resume_pdf_url: {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true
        },
        conversation: {
            type: Schema.Types.ObjectId,
            ref: 'resume_ai_conversations',
            required: true
        },
    },
    { timestamps: true } // This option should be passed as the second argument
);

export default mongoose.model('resume_ai_documents', resumeAiDocument);
