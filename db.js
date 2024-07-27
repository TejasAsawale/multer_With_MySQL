const mysql = require('mysql2');

connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Pass@123",
    database:"multerUsingMySQL"
})

try {
    connection.connect((error)=>{
        if(error){
            console.log(error);
        }
        console.log('connected to MySQL Database...');
    })
} catch (error) {
    console.log(error);
}

module.exports = connection;
