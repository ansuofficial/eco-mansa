const express = require("express");
const path = require("path");
const app = express();
const root = require("./routes/root")
const adminRoute = require("./routes/adminRoute")
const aboutRoute = require("./routes/aboutRoute")
const galleryRoute = require("./routes/galleryRoute")
const contactRoute = require("./routes/contactRoute")
const eventRoute = require("./routes/eventRoute")

app.use(express.json());
// app.use(cors())
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "views", "Admin")));

app.use("/", root);
app.use("/about", aboutRoute);
app.use("/events", eventRoute);
app.use("/gallery",galleryRoute);
app.use("/contact", contactRoute);
app.use("/admin", adminRoute);





module.exports = app;
