import mongoose from "mongoose"
import { STAFF, POSITION } from "../constant.js"
const { Schema } = mongoose

const StaffSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            default: null
        },
        staff_type: {
            type: String,
            enum: Object.values(STAFF),
            required: true,
            default: STAFF.STAFF
        },
        staff_position: {
            type: String,
            enum: Object.values(POSITION),
            default: POSITION.INTERN
        }
    },
    { timestamps: true }
)

export default mongoose.model('staffs', StaffSchema)
