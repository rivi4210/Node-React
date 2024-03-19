require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const corsOptions = require('./Config/corsOptions')
const connectDB = require('./dbConnection')

const PORT = process.env.PORT || 2552
const app = express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.get('/upload/:filename', (req, res) => {
    const imagePath = path.join(__dirname, '/public/upload/', req.params.filename);
    res.sendFile(imagePath, { headers: { 'Content-Type': 'image/jpeg' } });
});
app.use('/upload', express.static(__dirname + '/public/upload'));


app.use('/auth', require('./Rout/authRout'))
app.use('/user', require('./Rout/userRout'))
app.use('/lesson', require('./Rout/lessonRout'))
app.use('/word', require('./Rout/wordRout'))
app.use('/question', require('./Rout/questionRout'))
app.use('/exam', require('./Rout/examRout'))
mongoose.connection.once('open', () => {
    console.log('connected to DB');
    app.listen(PORT, () => { console.log(`Running on port ${PORT}`); })
    mongoose.connection.on('error', err => { console.log(err); })
})



