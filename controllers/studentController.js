// Import required modules
const fs = require('fs');
const path = require('path');

// Resolve the absolute path to the JSON file
const dataPath = path.resolve(__dirname, '../model/students.json');

// Function to read data from the JSON file
const getData = () => {
    try {
        const rawData = fs.readFileSync(dataPath);
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
};

// Function to write data to the JSON file
const setData = (newData) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2));
    } catch (error) {
        console.error('Error writing data:', error);
    }
};

// Object to manage student data
const data = {
    students: getData(), // Initialize students data by reading from the file
    setStudents: function (newData) {
        this.students = newData;
        setData(newData); // Update the JSON file when setting new data
    }
};

// Function to get all students
const getAllStudents = (req, res) => {
    if (req.session.user) {
        res.json(data.students);
    } else {
        res.status(401).json({
            "status": "fail",
            "message": "unauthorized"
        });
    }
};

// Function to create a new student
const createNewStudent = async (req, res) => {
    if (req.session.user) {
        const newStudent = {
            id: data.students.length ? data.students[data.students.length - 1].id + 1 : 1,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        };

        if (!newStudent.firstname || !newStudent.lastname) {
            return res.status(400).json({ 'message': 'First and last names are required.' });
        }

        data.setStudents([...data.students, newStudent]);
        res.status(201).json(data.students);
    } else {
        res.status(401).json({
            "status": "fail",
            "message": "unauthorized"
        });
    }
};

// Function to update a student
const updateStudent = (req, res) => {
    if (req.session.user) {
        const student = data.students.find(stu => stu.id === parseInt(req.body.id));
        if (!student) {
            return res.status(400).json({ "message": `Student ID ${req.body.id} not found` });
        }

        if (req.body.firstname) student.firstname = req.body.firstname;
        if (req.body.lastname) student.lastname = req.body.lastname;

        const filteredArray = data.students.filter(stu => stu.id !== parseInt(req.body.id));
        const unsortedArray = [...filteredArray, student];

        data.setStudents(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
        res.json(data.students);
    } else {
        res.status(401).json({
            "status": "fail",
            "message": "unauthorized"
        });
    }
};

// Function to delete a student
const deleteStudent = (req, res) => {
    if (req.session.user) {
        const student = data.students.find(stu => stu.id === parseInt(req.body.id));
        if (!student) {
            return res.status(400).json({ "message": `Student ID ${req.body.id} not found` });
        }

        const filteredArray = data.students.filter(stu => stu.id !== parseInt(req.body.id));
        data.setStudents([...filteredArray]);
        res.json(data.students);
    } else {
        res.status(401).json({
            "status": "fail",
            "message": "unauthorized"
        });
    }
};

// Function to get a specific student by ID
const getStudent = (req, res) => {
    if (req.session.user) {
        const student = data.students.find(stu => stu.id === parseInt(req.params.id));
        if (!student) {
            return res.status(400).json({ "message": `Student ID ${req.params.id} not found` });
        }
        res.json(student);
    } else {
        res.status(401).json({
            "status": "fail",
            "message": "unauthorized"
        });
    }
};

// Export all functions for use in other files
module.exports = {
    getAllStudents,
    createNewStudent,
    updateStudent,
    deleteStudent,
    getStudent
};
