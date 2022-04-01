/**
 * @file Defines mongoose schema for documents in the tuits collection
 */
import mongoose, {Schema} from "mongoose";

const TuitSchema = new mongoose.Schema({

    tuit : {type:String, required:true},
    postedBy : {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn : {type: Date, default: Date.now},
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0},
        currentUserLike: {type: Number, default: 0},
        currentUserDislike: {type: Number, default: 0}
    }

}, {collection: 'tuits'});
export default TuitSchema;