import mongoose, { Schema, Document } from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface AdminPage {
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

const AdminSchema = new Schema<Person>({
    firstName: String,
    lastName: String,
    email: String,
    
    username: String,
    password: String,
    birthDate: String,
    image: String,
});

AdminSchema.plugin(mongooseAggregatePaginate);
AdminSchema.plugin(mongoosePaginate);

const PersonModel = mongoose.model<Person>('Admin', AdminSchema);
export default PersonModel;

export const getAdmins = () => PersonModel.find();