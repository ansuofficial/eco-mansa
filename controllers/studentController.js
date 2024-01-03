
const data = {
    students: require('../model/students.json'),
    setStudents: function (data) { this.students = data }
}

const getAllStudents = (req, res) => {
    res.json(data.students);
}

const createNewStudent = async (req, res) => {
    const newStudent = {
        id: data.students?.length ? data.students[data.students.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newStudent.firstname || !newStudent.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }

    data.setStudents([...data.students, newStudent]);
    res.status(201).json(data.students);
}

const updateStudent = (req, res) => {
    const student = data.students.find(stu => stu.id === parseInt(req.body.id));
    if (!student) {
        return res.status(400).json({ "message": `student ID ${req.body.id} not found` });
    }
    if (req.body.firstname) student.firstname = req.body.firstname;
    if (req.body.lastname) student.lastname = req.body.lastname;
    const filteredArray = data.students.filter(stu => stu.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, student];
    data.setStudents(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.students);
}

const deleteStudent = (req, res) => {
    const student = data.students.find(stu => stu.id === parseInt(req.body.id));
    if (!student) {
        return res.status(400).json({ "message": `student ID ${req.body.id} not found` });
    }
    const filteredArray = data.students.filter(stu => stu.id !== parseInt(req.body.id));
    data.setStudents([...filteredArray]);
    res.json(data.students);
}

const getStudent = (req, res) => {
    const student = data.students.find(stu => stu.id === parseInt(req.params.id));
    if (!student) {
        return res.status(400).json({ "message": `student ID ${req.params.id} not found` });
    }
    res.json(student);
}

module.exports = {
    getAllStudents,
    createNewStudent,
    updateStudent,
    deleteStudent,
    getStudent
}