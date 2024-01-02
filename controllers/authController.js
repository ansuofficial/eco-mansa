const path = require('path');


  
// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
exports.handleLogin = async (req,res,)=>{
    
    // const foundUser = await usersDB.find(user=>{
    //     return user.username === req.body.username && user.password === req.body.password
    // })
    
    // if (!foundUser) return res.sendStatus(401)

    res.sendFile(path.join(__dirname, "..", "public" ,'views' ,"Admin", "admin.html"))
}