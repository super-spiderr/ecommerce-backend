import mongoose, { Schema } from "mongoose";

const MovieSchema = new Schema({}, { strict: false });
export const Movie = mongoose.model("Movie", MovieSchema, "movies");
