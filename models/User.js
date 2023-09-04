import { Schema, model, Types } from 'mongoose';

const collection = 'users';

const schema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    profile: {
        bio: { type: String }
    }
})

const Users = model(collection, schema);

export default Users;