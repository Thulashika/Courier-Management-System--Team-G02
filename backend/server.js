import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const db = mysql.createConnection({
    host:'localhost',
    database:'Courier-Service-Project',
    user:'root',
    password:''
})

const app = express()

app.use(express.json())
app.use(cors())

app.post('/user',(req,res) => {
    const createQuery = 'insert into userProfile (`fullName`,`role`,`contactNumber`,`email`, `password`) values (?)'
    const values = [
        req.body.fullName,
        req.body.role,
        req.body.contactNumber,
        req.body.email,
        req.body.password
    ]

    db.query(createQuery,[values],(err,data) => {
        if(err) {
            return res.json(err)
        }
        return res.json("Created Successfully")
    })
})

app.listen(6431, () => {
    console.log("Running")
})