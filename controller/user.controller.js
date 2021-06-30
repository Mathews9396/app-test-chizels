const sql = require("../db_connection");

const jwt = require('jsonwebtoken');
const secretKey = require('../config/auth.config');

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.registerUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (password.length > 6) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err)
                    throw err
                else {
                    sql.query(
                        "SELECT * FROM users where username=? OR email=?",
                        [username, email], (err, result) => {
                            if (result.length > 0) {
                                console.log("user already regsitered ", username);
                                res.status(402).send({
                                    message: "User already registered"
                                })
                            }
                            else {
                                sql.query(
                                    "INSERT INTO users (username,password) VALUES (?, ?)",
                                    [username, password],
                                    (err, result) => {
                                        if (result) {
                                            console.log("added ", username, " to db");
                                            res.status(200).send({
                                                message: "Successfully registered!"
                                            })
                                        }
                                        else {
                                            console.log("Error - ", err);
                                            res.status(402).send({
                                                error: "Could not register!"
                                            })
                                        }
                                    })
                            }
                        }
                    )
                }
            });
        });
    }
}

// NOT REGEXP '^[^@]+@[^@]+\. [^@]{2,}$'

exports.createUsersTable = (req, res) => {
    console.log("creating users table");

    var createStatament = "CREATE TABLE users (userName varchar(255) UNIQUE NOT NULL, password varchar(255),email varchar(255), address varchar(255), status varchar(255) DEFAULT 'inactive', created_at timestamp DEFAULT current_timestamp, updated_at timestamp )"

    sql.query(createStatament, function (err) {
        if (err) {
            console.log("couldn't create the table");
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User Table."
            });
        }
        else {
            console.log("success");
            res.send({ message: "Table for users created" });
        }
    })
}

exports.getAllUsers = (req, res) => {
    var getStatament = "SELECT * FROM users"

    sql.query(getStatament, function (err, data) {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while getting all users."
            });
        else {
            console.log("getting all users", data);
            res.send({
                message: "Found the records",
                data: data
            });
        }
    })
}

exports.deleteUsersTable = (req, res) => {
    var deleteStatement = "DROP TABLE users"

    sql.query(deleteStatement, function (err) {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error occurred while deleting Users Table."
            });
        else {
            console.log("success");
            res.send({ message: "Table dropped" });
        }
    })
}

exports.deleteAllUsers = (req, res) => {
    var deleteData = "TRUNCATE TABLE users"

    sql.query(deleteData, function (err) {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error occurred while deleting Users data"
            });
        else {
            console.log("success");
            res.send({ message: "All records deleted" });
        }
    })
}