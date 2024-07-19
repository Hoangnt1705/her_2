import mongoose from 'mongoose';
const { Schema } = mongoose;

const ResumeTemplateSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        symbol_number:{
            type: Number,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },


    }
);

export default mongoose.model('resumes_ai', ResumeTemplateSchema);
