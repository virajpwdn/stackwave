const express = require('express');
const app = express();
const authRouter = require("./router/auth.routes");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))

app.use("/auth", authRouter);



module.exports = app