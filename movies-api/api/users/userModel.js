import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {
    type: String,
    required: true,
    minlength: 8,  
    validate: {
      validator: function(value) {
        return /[!@#$%^&*(),.?":{}|<>]/.test(value);
      },
      message: 'Password must contain at least one special character.'
    }
  },
  playlist: [
    {
      adult: Boolean,
      backdrop_path: String,
      genre_ids: [Number],
      id: Number, 
      original_language: String,
      original_title: String,
      overview: String,
      popularity: Number,
      poster_path: String,
      release_date: String,
      title: String,
      video: Boolean,
      vote_average: Number,
      vote_count: Number,
      favorite: Boolean,
    },
  ],
});


UserSchema.methods.comparePassword = async function (passw) { 
  return await bcrypt.compare(passw, this.password); 
}

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.pre('save', async function(next) {
  const saltRounds = 10; // You can adjust the number of salt rounds
  //const user = this;
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
  } catch (error) {
     next(error);
  }

  } else {
      next();
  }
});
export default mongoose.model('User', UserSchema);