// getting-started.js
const mongoose = require('mongoose');
const logger = require('../utils/Logger');


module.exports.connect_db = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("=================> Base de données connectées ! <=================");
    } catch (error) {
        logger.error("=================> rreur lors de la connexion à la base de données <=================\n", error);        
    }
}