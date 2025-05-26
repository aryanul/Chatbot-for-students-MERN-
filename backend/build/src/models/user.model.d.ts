import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    name: string;
    email: string;
    password: string;
    chats: mongoose.Types.DocumentArray<{
        id: string;
        role: string;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        id: string;
        role: string;
        content: string;
    }> & {
        id: string;
        role: string;
        content: string;
    }>;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
    chats: mongoose.Types.DocumentArray<{
        id: string;
        role: string;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        id: string;
        role: string;
        content: string;
    }> & {
        id: string;
        role: string;
        content: string;
    }>;
}, {}> & {
    name: string;
    email: string;
    password: string;
    chats: mongoose.Types.DocumentArray<{
        id: string;
        role: string;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        id: string;
        role: string;
        content: string;
    }> & {
        id: string;
        role: string;
        content: string;
    }>;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    email: string;
    password: string;
    chats: mongoose.Types.DocumentArray<{
        id: string;
        role: string;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        id: string;
        role: string;
        content: string;
    }> & {
        id: string;
        role: string;
        content: string;
    }>;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    email: string;
    password: string;
    chats: mongoose.Types.DocumentArray<{
        id: string;
        role: string;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        id: string;
        role: string;
        content: string;
    }> & {
        id: string;
        role: string;
        content: string;
    }>;
}>, {}> & mongoose.FlatRecord<{
    name: string;
    email: string;
    password: string;
    chats: mongoose.Types.DocumentArray<{
        id: string;
        role: string;
        content: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        id: string;
        role: string;
        content: string;
    }> & {
        id: string;
        role: string;
        content: string;
    }>;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
