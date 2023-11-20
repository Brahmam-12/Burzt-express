
const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
     username: String,
     password: String
})

const studentModel = model('students', studentSchema)

module.exports = studentModel