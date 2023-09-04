import { Schema, model, Types } from 'mongoose';

const collection = 'cities';

const schema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    language: { type: String, required: true },
    currency: { type: String, required: true }
}, {
    timestamps: true
});

const Cities = model(collection, schema);

export default Cities;