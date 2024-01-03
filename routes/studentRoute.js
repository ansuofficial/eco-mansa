const express = require('express')
const router = express.Router()
const studentController = require("../controllers/studentController")

router.route('/').get(studentController.getAllStudents)
router
    .route('/id')
    .get(studentController.getStudent)
    .post(studentController.createNewStudent)
    .patch(studentController.updateStudent)
    .delete(studentController.deleteStudent)



module.exports = router