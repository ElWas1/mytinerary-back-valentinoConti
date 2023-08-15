import { Schema, model, Types } from 'mongoose';

const collection = 'cities';

const schema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    language: { type: String, required: true },
    currency: { type: String, required: true },
    create_by: {type: Types.ObjectId, ref: 'users'}
}, {
    timestamps: true
});

const Cities = model(collection, schema);

export default Cities;