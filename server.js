const express = require("express");
const app = express();
const cors = require("cors");
const authJwt = require('./middleware/auth');
const users = require('./controller/user.controller');

// parse requests of content-type: application/json
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({message:"Welcome to a sample Node application"});
});

// app.post('/register', users.registerUser, (req,res) =>{
//   res.json({res});
// });

// app.post('/login', users.userLogin, (req,res) => {
//   res.json({res});
// })

// authJwt.verifyToken,


app.post("/user/create-users-table", users.createUsersTable);

app.post("/user/get-all-users", users.getAllUsers);

app.post("/user/delete-users", users.deleteAllUsers);

app.post("/user/delete-users-table", users.deleteUsersTable);



// set port, listen for requests
app.listen(`${PORT}`, () => {
  console.log(`Server is running on port ${PORT}`);
});