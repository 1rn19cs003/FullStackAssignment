import express from "express";
import bodyParser from "body-parser";
import ExpressConfig from "./config/express-config";
const cookieParser = require('cookie-parser');


const app = ExpressConfig()
app.use(express.json());
app.use(cookieParser());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const PORT = process.env.PORT || 3003;
const dbPort = process.env.DB_PORT

app.listen(PORT, () => console.log(`Server running at port ${PORT} and db port is ${dbPort}`))
