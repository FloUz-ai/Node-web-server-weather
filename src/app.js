const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define path foe express
const publicDirectory = path.join(__dirname, "../public");
const viewsPAth = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partials");

//app.com
//app.com/about
//app.com/help ................

//Set up handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPAth);
hbs.registerPartials(partialPath);

//Set up, static directory to serve
app.use(express.static(publicDirectory));

//FOR A STATIC PAGE
// app.use(express.static(path.join(__dirname, "../public/help.html")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Flo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "ABout me",
    name: "We dont want dto know",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "blabalbla0",
    title: "Need help",
    name: "Someone need help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address missing",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "bla bla bla",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help not found",
    title: "Error",
    name: "Flo",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Error, not foud hey",
    title: "Error",
    name: "Flo",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
