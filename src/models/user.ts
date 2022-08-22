import { PasswordUtil } from './../utils/password.util';
import mongoose  from "mongoose";

interface UserAttrs {
    email: string;
    password: string;
    store: string;
}
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

export interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    store: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    store: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps: true
    
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const hashed = await PasswordUtil.toHash(this.get('password'));
        this.set('password', hashed);
    }
});


export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
