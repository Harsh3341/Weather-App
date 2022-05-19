const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const https = require("https");


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {

    const city = req.body.cityName;


    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=id";



    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            const weatherinfo = weatherdata.weather[0].description;
            const temp = weatherdata.main.temp;
            const icon = weatherdata.weather[0].icon;

            const url2 = " http://openweathermap.org/img/wn/" + icon + "@2x.png";



            res.write("<p>The weather is currently " + weatherinfo + "</p>");
            res.write('<h1>Current temperature in ' + city + ' is ' + temp);
            res.write("<br><img src=" + url2 + ">");
            res.send();


        });

    });
});


app.listen(3000, function () {
    console.log("The server has started on port 3000");
});
