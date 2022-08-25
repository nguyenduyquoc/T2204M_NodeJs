const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log("Server is running...")
})

app.get("/",function (req,res){
    res.send("Nguyen Duy Quốc");
})

app.get("/bong_da",function (req, res){
    res.send("Bóng dá 24h");
})