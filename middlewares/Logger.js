const fs = require('fs');
const path = require('path');


const logDirectory = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const getLogFileName = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Mois avec zéro devant si nécessaire
    const day = (`0${date.getDate()}`).slice(-2); // Jour avec zéro devant si nécessaire
    return path.join(process.cwd(), `/logs/${year}-${month}-${day}.log`);
  };

const loggerMiddleware = (req, res, next) => {
    const startTime = new Date().toISOString();
  
    const { method, url } = req;
  
    const oldSend = res.send;
  
    res.send = function (data) {
      res.send = oldSend;
      res.send(data);
  
      const endTime = new Date().toISOString();

      const logString = `${startTime}${res?.user ? ' ' + res?.user.username + ' ===> ' : ''} ${method} ${url} | ${res.statusCode} | Durée: ${new Date(endTime) - new Date(startTime)}ms\n`;

      fs.appendFile(`${getLogFileName()}`, logString, (err) => {
        if (err) {
          console.error('Erreur lors de l\'écriture du log dans le fichier', err);
        }
      });
  
      console.log(logString);
    };
  
    next();
  };
  
  module.exports = loggerMiddleware;
  