const mysql = require('mysql');

// create connection
const db = mysql. createConnection({
    host: "vs2205.mirohost.net",
    user: "u_pepperteam",
    password: "postgres",
    database: "pepperTeamAPI"
});

//connect
db.connect((err) => {
    if (err){
        console.log(err);
        console.error('PepperDB was not connected...');
    } else
    console.log('PepperDB connected...')
});

module.exports = db;