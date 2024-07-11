// import express from 'express'
// import mysql from 'mysql'
// import cors from 'cors'

// // Database connection setup (adjust to your configuration)
// const db = mysql.createConnection({
//     host:'localhost',
//     database:'Courier-Service-Project',
//     user:'root',
//     password:''
// })

// const app = express()

// app.use(express.json()) // for parsing application/json
// app.use(cors())

// const branch = () => {
//     app.post('/Createbranch', (req,res) => {
//         const createBranchQuery = 'insert into branch(`branchCode`, `branchName`, `branchAddress`, `city`, `contactNumber`, `zipCode`) values(?)'

//         const values = [
//             req.body.branchCode,
//             req.body.branchName,
//             req.body.branchAddress,
//             req.body.city,
//             req.body.contactNumber,
//             req.body.zipCode
//         ]

//         // Validation function to check if any value is empty
//         const isValid = values.every(value => value !== undefined && value !== '');

//         if (!isValid) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         // Validate branch code (assuming it should be a 5-digit number)
//         // const BCregex = /^(?:Br)?[A-z]{2}?[0-9]{2}$/;  
//         const BCregex = /^(?:BR)?[0-9]{3}$/;  
//         if (!BCregex.test(req.body.branchCode)){
//             return res.status(400).json({ message: 'Invalid branch code' });
//         }

//         // Validate contact number (assuming it should be a 10-digit number)
//         const CNregex = /^(?:0)?[7][01245678][0-9]{7}$/;    
//         if (!CNregex.test(req.body.contactNumber)){
//             return res.status(400).json({ message: 'Invalid contact number' });
//         }

//         // Validate zip code (assuming it should be a 5-digit number)
//         const ZCodeRegex = /^[0-9]{5}$/;
//         if (!ZCodeRegex.test(req.body.zipCode)){
//             return res.status(400).json({ message: 'Invalid zip code' });
//         }

//         db.query(createBranchQuery, [values], (err,data) => {
//             if(err) {
//                 console.log(err)
//                 if(err.errno === 1062) {
//                     return res.status(500).json({statusCode:500, statusMessage:'Duplicate entry'})
//                 }
//                 return res.status(500).json(err)
//             }
//             return res.status(201).json({statusCode:201, statusMessage:'Created Successfully'})
//         })
//     })
// }

// module.exports = branch