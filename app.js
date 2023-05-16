import express from "express";
const app = express();
import ejs from "ejs";
// const https = require("https");
import fetch from "node-fetch";

// api key
const myKey = "0cd949165092b5930d30356ca092ce08";

// k to cel
function ktoC(k) {
  return (k - 273.15).toFixed(2);
}

// middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/:city", async (req, res) => {
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;

  let d = await fetch(url);
  let djs = await d.json();
  let { temp } = djs.main;
  let newTemp = ktoC(temp);
  res.render("weather.ejs", { djs, newTemp });

  // // get request made by node.js
  // https
  //   .get(url, (response) => {
  //     console.log("statusCode:", response.statusCode);
  //     console.log("headers:", response.headers);

  //     response.on("data", (d) => {
  //       let djs = JSON.parse(d);
  //       let { temp } = djs.main;
  //       let newTemp = ktoC(temp);
  //       res.render("weather.ejs", { djs, newTemp });
  //     });
  //   })
  //   .on("error", (e) => {
  //     console.log(e);
  //   });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
