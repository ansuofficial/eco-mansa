const express = require('express')
const router = express.Router()
const path = require('path')


router.route('/').get((req,res)=>{
    res.sendFile(path.join(__dirname, "..", "public" ,'views' , "about.html"))
})

module.exports = router