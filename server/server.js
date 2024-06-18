// Remove this line as you already have 'mysql2' imported later
// const mysql = require('mysql');

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // Import 'mysql2' once

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Anshu@7739',
    database: 'samharoh_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to MySQL server');
});

// Example query
connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

// End connection
connection.end();

app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password, privacyPolicy } = req.body;

    if (firstName && lastName && email && password && privacyPolicy) {
        const sql = 'INSERT INTO users (firstName, lastName, email, password, privacyPolicy) VALUES (?, ?, ?, ?, ?)';
db.query(sql, [firstName, lastName, email, password, privacyPolicy], (err, result) => {
    if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ success: false, message: 'Error creating account' });
        return;
    }
    res.json({ success: true, message: 'Account Created Successfully' });
});

    } else {
        res.json({ success: false, message: 'Please fill all fields and accept the Privacy & Policy' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://192.168.171.116:${port}/`);
});
