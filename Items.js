const mongoose = require('mongoose');
const itemSchema=new mongoose.Schema({
name:String,
brand:String,
price:Number
});

module.exports = mongoose.model('Items',itemSchema);