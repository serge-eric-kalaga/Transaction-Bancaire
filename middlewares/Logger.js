const fs = require('fs');
const path = require('path');


const logFilePath = path.join(__dirname, 'app.log');

const loggerMiddleware = (req, res, next) => {
    const startTime = new Date().toISOString();
  
    const { method, url } = req;
  
    const oldSend = res.send;
  
    res.send = function (data) {
      res.send = oldSend;
      res.send(data);
  
      const endTime = new Date().toISOString();

      const logString = `${startTime}${res?.user ? ' ' + res?.user.username + ' ===> ' : ''} ${method} ${url} | ${res.statusCode} | Durée: ${new Date(endTime) - new Date(startTime)}ms\n`;

      fs.appendFile(`${logFilePath}`, logString, (err) => {
        if (err) {
          console.error('Erreur lors de l\'écriture du log dans le fichier', err);
        }
      });
  
      console.log(logString);
    };
  
    next();
  };
  
  module.exports = loggerMiddleware;
  