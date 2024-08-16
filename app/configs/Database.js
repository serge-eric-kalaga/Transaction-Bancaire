// getting-started.js
const mongoose = require('mongoose');


module.exports.connect_db = async () => {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Base de données connectées !");
}