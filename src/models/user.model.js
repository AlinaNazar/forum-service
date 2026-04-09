import {Schema, model} from "mongoose";

const userSchema = new Schema({
        login: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        roles: {
            type: [String],
            default: ['User']
        }
    },
    {
        versionKey: false,
    })

export default model('User', userSchema, 'users');