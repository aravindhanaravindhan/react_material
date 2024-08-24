const express = require('express')
const mysql = require("mysql")
const cors = require("cors")
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "pharmacy",
})

connection.connect((err) => {
    if (err) {
        console.error('connecgtion ' + err)
        return
    }
    console.log("database connected");

})
app.post('/dataAdd', (req, res) => {
    const {field1,field2,field3,date,checked,selectedCity} = req.body
    console.log(req.body);
    try {
        connection.query('INSERT INTO employees (emp_no, name, email) VALUES (?, ?, ?)', (err, results) => {
            console.log("df ");
            if (err) {
                console.error("while fetchingerror" + err)
            }
            res.json(results)
        })
    } catch (error) {

    }
})

app.post('/employeeAdd', (req, res) => {
    console.log("dytdytdyt");
    
    const { emp_no, name, email } = req.body;
    console.log(req.body);
    try {
        const sql='INSERT INTO employees (emp_no, name, email) VALUES (?, ?, ?)'
        connection.query(sql,[emp_no, name, email], (err, results) => {
            console.log("df ");
            if (err) {
                console.error("while fetchingerror" + err)
            }
            res.json(results)
        })
    } catch (error) {

    }
})

app.get('/users', (req, res) => {
    try {

        connection.query('SELECT * FROM users', (err, results) => {

            if (err) {
                console.error("while fetchingerror" + err)
            }
            res.json(results)
        })
    } catch (error) {

    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})