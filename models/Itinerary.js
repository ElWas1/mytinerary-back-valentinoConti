import { Schema, model, Types } from 'mongoose';

const collection = 'itineraries';

const schema = new Schema({
    city: { type: Types.ObjectId, ref: 'cities' },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    likes: { type: Number, required: true },
    hashtags: [{ type: String, required: true }],
    comments: [{ type: String }],
    activities: [{
        photo: { type: String },
        description: { type: String}
    }],
    created_by: { type: Types.ObjectId, ref: 'users' }
}, {
    timestamps: true
});

const Itineraries = model(collection, schema);

export default Itineraries;