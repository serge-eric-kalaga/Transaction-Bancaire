// getting-started.js
const mongoose = require('mongoose');


module.exports.connect_db = async () => {
    await mongoose.connect('mongodb://localhost:27017/');
    console.log("Base de données connectées !");
}