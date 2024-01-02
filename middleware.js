const express = require("express");
const path = require("path");
const app = express();
const root = require("./routes/root")
const adminRoute = require("./routes/adminRoute")
const aboutRoute = require("./routes/aboutRoute")
const galleryRoute = require("./routes/galleryRoute")
const contactRoute = require("./routes/contactRoute")
const eventRoute = require("./routes/eventRoute");
const logoutRoute = require("./routes/logoutRoute")
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT")

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser())

// app.use(cors())
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "views", "Admin")));

app.use("^/$|/index(.html)?", root);
app.use("/about", aboutRoute);
app.use("/events", eventRoute);
app.use("/gallery",galleryRoute);
app.use("/contact", contactRoute);
app.use("/admin", adminRoute);
app.use("/logout", logoutRoute);





module.exports = app;
