import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    role:{type:String, enum:['admin', 'user'], default:'user'},
})

export default model("User", userSchema);