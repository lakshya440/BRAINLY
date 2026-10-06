//create usermodels and schemas
import mongoose, { Schema, model } from "mongoose";//v.imp line 

mongoose.connect("mongodb+srv://itslakshya777_db_user:vwu6F51JxdY0i1GM@cluster0.7c9vt5w.mongodb.net/BRAINLY");



const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})
export const UserModel = model("User",UserSchema);

const ContentSchema = new Schema({
    title : String,
    link : String,
    tags : [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId : {type: mongoose.Types.ObjectId, ref: 'User',required: true}
})


export const ContentModel = model("Content",ContentSchema);