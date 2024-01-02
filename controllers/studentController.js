const data = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const getAllUsers = (req, res) => {
    res.json(data.users);
}

const createNewUser = (req, res) => {
    const newUser = {
        id: data.users?.length ? data.users[data.users.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newUser.firstname || !newUser.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }

    data.setUsers([...data.users, newEmployee]);
    res.status(201).json(data.users);
}

const updateUser = (req, res) => {
    const user = data.users.find(emp => emp.id === parseInt(req.body.id));
    if (!user) {
        return res.status(400).json({ "message": `User ID ${req.body.id} not found` });
    }
    if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;
    const filteredArray = data.users.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, user];
    data.setUsers(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.users);
}

const deleteUser = (req, res) => {
    const user = data.users.find(emp => emp.id === parseInt(req.body.id));
    if (!user) {
        return res.status(400).json({ "message": `User ID ${req.body.id} not found` });
    }
    const filteredArray = data.users.filter(emp => emp.id !== parseInt(req.body.id));
    data.setUsers([...filteredArray]);
    res.json(data.users);
}

const getUser = (req, res) => {
    const user = data.users.find(emp => emp.id === parseInt(req.params.id));
    if (!user) {
        return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}