import mongoose from "mongoose"
import { CUSTOMER_RANK } from "../constant.js"
const { Schema } = mongoose

const CustomerSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        avatarUrl: {
            type: String,
            default: null
        },
        address: {
            type: String,
            default: null
        },



        description: {
            type: String,
            default: null
        },
        detail_info: {
            language: { type: String, default: null },
            birthday: { type: String, default: null },
            gender: { type: String, default: null },
        },
        rank_passers: {
            type: String,
            enum: Object.values(CUSTOMER_RANK),
            default: CUSTOMER_RANK.UNRANK
        },
        bank_name: {
            type: String,
            default: null
        },
        bank_account_number: {
            type: String,
            default: null
        }
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)
// CustomerSchema.virtual("orders", {
//     ref: "orders",
//     localField: "_id",
//     foreignField: "customer",
// });

export default mongoose.model('customers', CustomerSchema)