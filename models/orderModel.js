import mongoose from "mongoose";

// Define a separate schema for the counter
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

// Create a Counter model
const Counter = mongoose.model('Counter', counterSchema);

// Define the order schema
const orderSchema = new mongoose.Schema({
    orderId: { type: Number, unique: true },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]
    },
    totalPrice: {
        type: Number
    }
}, { timestamps: true });

// Middleware to auto-increment orderId before saving
orderSchema.pre('save', async function (next) {
    if (!this.isNew) return next();

    try {
        const counter = await Counter.findOneAndUpdate({ _id: 'orderId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
        this.orderId = counter.seq;
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model('Order', orderSchema);
