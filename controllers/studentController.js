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
            fullname: req.body.fullname,
            matNo: req.body.matNo,
            contact: req.body.contact,
            major: req.body.major,
            amount: parseInt(req.body.amount),
            date: req.body.date,
            gender: req.body.gender,
            intake: req.body.intake,
            status: req.body.status
        };

        if (!newStudent.fullname || !newStudent.matNo || !newStudent.contact || !newStudent.major || !newStudent.amount || !newStudent.date || !newStudent.gender || !newStudent.intake) {
            return res.status(400).json({ 'message': 'Incomplete Information.' });
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
        const student = data.students.find(stu => stu.matNo === parseInt(req.body.matNo));
        if (!student) {
            return res.status(400).json({ "message": `Student matNo ${req.body.matNo} not found` });
        }

        if (req.body.fullname) student.fullname = req.body.fullname;
        if (req.body.matNo) student.matNo = req.body.matNo;
        if (req.body.contact) student.contact = req.body.contact;
        if (req.body.major) student.major = req.body.major;
        if (req.body.amount) student.amount = req.body.amount;
        if (req.body.date) student.date = req.body.date;
        if (req.body.gender) student.gender = req.body.gender;
        if (req.body.intake) student.intake = req.body.intake;
        if (req.body.status) student.status = req.body.status;

        const filteredArray = data.students.filter(stu => stu.matNo !== parseInt(req.body.matNo));
        const unsortedArray = [...filteredArray, student];

        data.setStudents(unsortedArray.sort((a, b) => a.matNo > b.matNo ? 1 : a.matNo < b.matNo ? -1 : 0));
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
        const student = data.students.find(stu => stu.matNo === parseInt(req.body.matNo));
        if (!student) {
            return res.status(400).json({ "message": `Student matNo ${req.body.matNo} not found` });
        }

        const filteredArray = data.students.filter(stu => stu.matNo !== parseInt(req.body.matNo));
        data.setStudents([...filteredArray]);
        res.json(data.students);
    } else {
        res.status(401).json({
            "status": "fail",
            "message": "unauthorized"
        });
    }
};

// Function to get a specific student by matNo
const getStudent = (req, res) => {
    if (req.session.user) {
        const student = data.students.find(stu => stu.matNo === parseInt(req.params.matNo));
        if (!student) {
            return res.status(400).json({ "message": `Student matNo ${req.params.matNo} not found` });
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
