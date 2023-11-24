import mongoose, {Schema, Document} from 'mongoose'
import { v4 as uuidv4 } from 'uuid'


export interface IUser extends Document {
    name: String,
    email: String,
    age: Number,
}


const userSchema: Schema = new mongoose.Schema({
    name: String,
    email: {type: String , unique: true},
    age: Number,
    _id: {
        type: String,
        default: () => uuidv4(),
      },
})


export const UserModel = mongoose.model<IUser>('User', userSchema)

