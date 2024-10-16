import mongoose from "mongoose"
const { Schema } = mongoose

const biographyUserSchema = new Schema(
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

biographyUserSchema.index({ updatedAt: -1 })
export default mongoose.model('biography-users', biographyUserSchema);