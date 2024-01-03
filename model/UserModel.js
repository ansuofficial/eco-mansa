// UserModel.js
const usersDB = require('../model/users.json'); // Assuming you have a users.json file with user data

module.exports = {
  findByCredentials: (username, password) => {
    return usersDB.find(user => user.username === username && user.password === password);
  },
};
