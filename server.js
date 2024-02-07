const express = require("express")


const app = express();

app.get("/", (req, res) => {
  res.send({
    hey: 'guys',
    welcome: "back",
    to: "another",
    video: ",",
    please: "subscribe",
  });
});


app.listen(process.env.PORT || 4000)