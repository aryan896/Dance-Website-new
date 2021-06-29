const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/aryan', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we are connected");
});
var kittySchema = new mongoose.Schema({
    name: String
});

var Kitten = mongoose.model('puma', kittySchema);
    console.log(kittySchema.name)
var puma = new Kitten({ name: 'aryan' });
puma.save(function (err, puma) {
    if (err) return console.error(err);
    console.log("save it")
  });