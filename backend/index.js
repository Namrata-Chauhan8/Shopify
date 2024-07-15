const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Db = require("./config/Db");
const router = require("./routes/Routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(bodyParser.json({ limit: '1gb' }));
app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));
app.use(express.json())
app.use(cookieParser())


app.use("/api", router);

const PORT = 8080 || process.env.PORT
Db().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
