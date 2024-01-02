// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
// const fsPromises = require('fs').promises;
// const path = require('path');

// const handleLogout = async (req, res) => {
//     const cookies = req.cookies;

//     if (!cookies?.jwt) {
//         // No JWT cookie, send No Content response
//         return res.sendStatus(204);
//     }

//     const refreshToken = cookies.jwt;

//     // Check if refreshToken is in the database
//     const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);

//     if (!foundUser) {
//         // User not found in the database, clear the cookie and send No Content response
//         res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
//         return res.sendStatus(204);
//     }

//     // Remove refreshToken from the database
//     const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
//     const currentUser = { ...foundUser, refreshToken: '' };
//     usersDB.setUsers([...otherUsers, currentUser]);

//     // Save the updated users data to the file
//     await fsPromises.writeFile(
//         path.join(__dirname, '..', 'model', 'users.json'),
//         JSON.stringify(usersDB.users)
//     );

//     // Clear the JWT cookie and send No Content response
//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
//     res.sendStatus(204);
// }

// module.exports = { handleLogout };
