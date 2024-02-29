import mongoose, { Schema, Document } from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface userPage {
    results: { name: string }[],
    next: string | null,
    previous: string | null,
}

interface Person extends Document {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
}

const userSchema = new Schema<Person>({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    birthDate: String,
    image: { type :String,
              default:"https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png" },
    email: String,
    
});


userSchema.plugin(mongooseAggregatePaginate);
userSchema.plugin(mongoosePaginate);

const PersonModel = mongoose.model<Person>('user', userSchema);
export default PersonModel;

export const getUsers = () => PersonModel.find();

