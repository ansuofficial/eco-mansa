const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
// app.use(cors())
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "views", "Admin")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/about.html"));
});

app.get("/events", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/events.html"));
});

app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/gallery.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/login.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/contact.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "Admin", "admin.html"));
});

module.exports = app;
