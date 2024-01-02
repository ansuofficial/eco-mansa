// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
// const bcrypt = require('bcrypt');

// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const fsPromises = require('fs').promises;
// const path = require('path');

// const handleLogin = async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
//     const foundUser = usersDB.users.find(person => person.username === username);
//     if (!foundUser) return res.sendStatus(401); // Unauthorized
//     // evaluate password 
//     const match = await bcrypt.compare(password, foundUser.password);
//     if (match) {
//         const roles = Object.values(foundUser.roles);
//         // create JWTs
//         const accessToken = jwt.sign(
//             {
//                 "UserInfo": {
//                     "username": foundUser.username,
//                     "roles": roles
//                 }
//             },
//             process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: '30s' }
//         );
//         const refreshToken = jwt.sign(
//             { "username": foundUser.username },
//             process.env.REFRESH_TOKEN_SECRET,
//             { expiresIn: '1d' }
//         );
//         // Saving refreshToken with current user
//         const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
//         const currentUser = { ...foundUser, refreshToken };
//         usersDB.setUsers([...otherUsers, currentUser]);
//         await fsPromises.writeFile(
//             path.join(__dirname, '..', 'model', 'users.json'),
//             JSON.stringify(usersDB.users)
//         );
//         res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        
//         // Check if the user has the 'admin' role
//         if (roles.includes('admin')) {
//             // Send the admin page as a response
//             const adminPagePath = path.join(__dirname, '..', 'public', 'views', 'Admin', 'admin.html');
//             return res.sendFile(adminPagePath);
//         } else {
//             // User doesn't have admin role, handle accordingly
//             return res.status(403).json({ 'message': 'You do not have permission to access the admin page.' });
//         }
//     } else {
//         res.sendStatus(401);
//     }
// }

// module.exports = { handleLogin };
