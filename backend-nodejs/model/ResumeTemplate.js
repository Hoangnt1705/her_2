import mongoose from 'mongoose';
const { Schema } = mongoose;

const ResumeTemplateSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        symbol: {
            type: String,
            required: true,
            unique: true,
        },
        image_url: {
            type: String,
            required: true,
        },
        template: {
            type: String,
            required: true,
        }
    }
);

export default mongoose.model('resume_templates', ResumeTemplateSchema);
