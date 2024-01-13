import { Schema, model, Types } from 'mongoose';

const collection = 'users';

const schema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    password: { type: String, required: true },
    google: {type: Boolean, defalut: false},
    country: { type: String, required: true },
    online: { type: Boolean, required: true },
    verified: { type: Boolean, required: true },
    verified_code: { type: String },
    role: { type: String, required: true },
    profile: {
        bio: { type: String }
    }
})

const Users = model(collection, schema);

export default Users;