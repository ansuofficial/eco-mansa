const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const root = require("./routes/root")
const studentRoute = require("./routes/studentRoute")
const adminRoute = require("./routes/adminRoute")
const aboutRoute = require("./routes/aboutRoute")
const galleryRoute = require("./routes/galleryRoute")
const contactRoute = require("./routes/contactRoute")
const eventRoute = require("./routes/eventRoute");
const cookieParser = require("cookie-parser");

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000, // Set the maximum age of the cookie in milliseconds (1 hour in this example)
      },
  }));

//middleware for cookies
app.use(cookieParser())

// app.use(cors())
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "views", "Admin", )));

app.use("^/$|/index(.html)?", root);
app.use("/about", aboutRoute);
app.use("/events", eventRoute);
app.use("/gallery",galleryRoute);
app.use("/contact", contactRoute);
app.use("/admin", adminRoute);
app.use("/students", studentRoute);
app.use("/login", (req, res)=>{
    res.sendFile(path.join(__dirname, "public" ,'views' , "login.html"))
});


app.all("*", (req,res)=>{
    res.status(404).send(
        "<h1> 404, Page not found</h1>"
    );
})





module.exports = app;
