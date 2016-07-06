var mongoose = require('mongoose');



var reviewSchema = new mongoose.Schema({
name:  {
  type: String,
  required: true
    },
rating:  {
    type: Number,
    min: 1,
    max: 100,
    required: true
  },
comment:  {
    type: String,
    required: true
  },
postedBy:  {
  type: String,
  required: true
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User'
}
})

module.exports = mongoose.model('Review', reviewSchema);
