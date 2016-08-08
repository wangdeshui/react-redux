var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  isCompleted: Boolean
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;