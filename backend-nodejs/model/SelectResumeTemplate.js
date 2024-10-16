import mongoose from 'mongoose';
const { Schema } = mongoose;

const SelectResumeTemplate = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            unique: true,
        },
        resume_template: {
            type: Schema.Types.ObjectId,
            ref: 'resume_templates',
        },
    }
);

export default mongoose.model('select_resume_templates', SelectResumeTemplate);
