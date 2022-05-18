const express = require("express");
const cors = require("cors")
const cookieParser = require('cookie-parser');

require('dotenv').config();

console.log(`Secret Key---> ${process.env.SECRET_KEY}`)
const app = express();
const port = 8000;



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.static("images")) // tell the server where to store image uploads
app.use(cookieParser());


const routeFile = "user.routes" //change the routeFile for each project

require("./server/config/config");
require(`./server/routes/${routeFile}`)(app)

app.listen(port, () => console.log(`Listening on port: ${port}`))