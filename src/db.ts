import mongoose from "mongoose";

export async function connectToDatabase() {
    try{
        await mongoose.connect('mongodb+srv://spider0:Spider%402025@spider0.a4mfg5t.mongodb.net/sample_mflix?retryWrites=true&w=majority');

        console.log('Connected to MongoDB');
    }
    catch(error){
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
    }
