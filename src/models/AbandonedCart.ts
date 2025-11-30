import mongoose from 'mongoose';

const AbandonedCartSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    items: [{
        id: String,
        name: String,
        price: Number,
        image: String,
        sku: String,
        quantity: Number
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.AbandonedCart || mongoose.model('AbandonedCart', AbandonedCartSchema);