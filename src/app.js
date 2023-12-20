const express = require('express')
const hbs = require('hbs')
const path = require('path')
const lawyerRouter = require('./routes/lawyersRoute')
const ocrRouter = require('./routes/ocrRoute')
const validateRouter = require('./routes/validateRoute')
const app = express()
require('dotenv').config();

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3000

app.use(express.json())
app.use(lawyerRouter)
app.use(ocrRouter)
app.use(validateRouter)

app.listen(port, ()=>{ 
    console.log(`server running at port ${port}`);
})
