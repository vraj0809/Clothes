import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    image1: {
        type: String,
        required: true,
    },
    image2: {
        type: String,
        required: true,
    },
    image3: {
        type: String,
        required: true,
    },
    image4: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
        enum: ["Topwear", "Bottomwear", "Winterwear"],
        default: "Topwear"
    },
    sizes: {
        type: Array,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    bestseller: {
        type: Boolean,
        default: false,
    },
    numberofproducts: {
        S: { type: Number, default: 0 },
        M: { type: Number, default: 0 },
        L: { type: Number, default: 0 },
        XL: { type: Number, default: 0 },
        XXL: { type: Number, default: 0 }
    },
    ratings: [
        {
            userId: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String },
            date: { type: Date, default: Date.now }
        }
    ],
avgrating: {
        type: Number,
        default: 0,
    }
}, { timestamps: true })

const Product = mongoose.model("Product", productschema)
export default Product;