import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        password: {
            type: String,
            required: function () {
                // Check if the role reference is to the "staffs" collection
                return this.role && this.role.ref === 'staffs';
            },
        },
        sub: {
            type: String, 
            trim: true,
            index: {
                unique: true,
                partialFilterExpression: { sub: { $type: "String" } }
            }
        },
        email: {
            type: String,
            trim: true,
            index: {
                unique: true,
                partialFilterExpression: { email: { $type: "String" } }
            }
        },
        phone: {
            type: String,
            trim: true,
            index: {
                unique: true,
                partialFilterExpression: { phone: { $type: "String" } }
            }
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: "customers" || "staffs",
        },
        isActive: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

UserSchema.pre("validate", function (next) {
    let hasProvider = false;
    if (
        (this.email && this.email.length > 0) ||
        (this.phone && this.phone.length > 0)
    ) {
        hasProvider = true;
    }
    return hasProvider ? next() : next(new Error("No Provider provided"));
});

export default mongoose.model("users", UserSchema);
