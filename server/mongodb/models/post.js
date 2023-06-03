import mongoose from 'mongoose';

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  promptFR: { type: String, required: false },
  linkAudio: { type: String, required: false },
  linkImg: { type: String, required: false },
  // photo: { type: String, required: true },
  number: { type: Number, required: true },
});

const PostSchema = mongoose.model('Post', Post);

export default PostSchema;
