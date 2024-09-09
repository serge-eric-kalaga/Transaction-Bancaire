const axios = require("axios");

const testRequestManyTimes = async (url="http://localhost:5000/users", times = 100) => {
  for (let i = 0; i < times; i++) {
    axios.get(url).then((response) => {
      // console.log(response.status);
    }).catch((error) => {
      console.log(error);
    });
  }
}

module.exports = testRequestManyTimes;