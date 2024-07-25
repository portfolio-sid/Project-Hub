const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
//cors middleware to whitelist the api
app.use(cors());

const db = require('./models')

//Routers
const postRouter = require('./routes/Posts');
const usersRouter = require("./routes/Users");
const studentsRouter = require("./routes/Students");
const managementRouter = require("./routes/Management");
app.use("/posts", postRouter);
app.use("/auth",  usersRouter);
app.use("/assign", studentsRouter);
app.use("/manage", managementRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () =>{
        console.log("Server running on port 3001!");
    });    
});
