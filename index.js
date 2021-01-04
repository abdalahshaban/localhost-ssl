const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require('express-session');


const app = express();
const port = process.env.PORT || 3000;

const APP_ID = "https://localhost:4200";

app.use(session({ secret: "ISEC", name: "hardKey", resave: true, saveUninitialized: true, cookie: { secure: true, maxAge: 600000 } }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: [APP_ID], credentials: true }));

app.get("/", (req, res, next) => {
    res.send({ message: "HelloWorld" })
})



const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'certification', 'New folder', 'localhost.key'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, 'certification', 'New folder', 'localhost.crt'), 'utf8'),
    ca: fs.readFileSync(path.join(__dirname, 'certification', 'New folder', 'ca.crt'), 'utf8'),
    // requestCert: false,
    // rejectUnauthorized: false,
}

https.createServer(httpsOptions, app)
    .listen(port, () => {
        console.log(`server run on port ${port}`);
    })
