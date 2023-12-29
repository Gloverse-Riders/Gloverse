import {model, models, Schema} from "mongoose";


const UserInfoSchema = new Schema({
    email:{type:String, required:true},
    phone: {type:String},
    city: {type:String},
    postalCode: {type:String},
    number: {type:String},
    streetAddress: {type:String},
    admin: {type: Boolean, default: false},
    }
);

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);