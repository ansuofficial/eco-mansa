const path = require('path');

const usersDB = {
    users: require('../model/users.json'), // Assuming you have a users.json file with user data
    setUsers: function (data) { this.users = data }
}

exports.handleLogin = async (req, res) => {
    const enteredUsername = req.body.username;
    const enteredPassword = req.body.password;

    // Check if the entered credentials are valid
    const foundUser = usersDB.users.find(user => {
        return user.username === enteredUsername && user.password === enteredPassword;
    });

    if (foundUser) {
        // Successful login
        return res.sendFile(path.join(__dirname, '..', 'public', 'views', 'Admin', 'admin.html'));
    } else {
        // Incorrect credentials
        return res.status(401).send('Incorrect credentials. Please try again.');
    }
};
