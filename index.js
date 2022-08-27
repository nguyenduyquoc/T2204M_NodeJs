const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log("Server is running...")
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "db4free.net",
    user: "nguyenduyquoc",
    password: "Ndquoc2904", //xampp: "", mampp: "root"
    database: "t2204m_nodejsqqq",
    port: 3306
});


app.get("/",function (req,res){
    res.send("Nguyen Duy Quốc");
});


app.get("/bong_da",function (req, res){
    res.send("Bóng dá 24h");
});

//api danh sach category
app.get("/api-get-category",function (req, res) {
    const sql_txt = "select * from category";
    conn.query(sql_txt, function (err,data) {
        if(err) res.send("Error");
        else res.send(data);
    })
});


//api danh sach product kem category
app.get("/api-get-categoryproduct",function (req, res) {
    const sql_txt = "select * , category.id, category.name from product inner join category on category.id = product.categoryId;";
    conn.query(sql_txt, function (err,data) {
        if(err) res.send("Error");
        else res.send(data);
    })
});

app.get("/api-product-by-category",function (req,res) {
    const categoryId = req.query.categoryId;
    const sql_txt = "select product.id,product.name,product.price,category.name as " +
        "category_name from product left join category on product.categoryId = " +
        "category.id where categoryId = "+categoryId;
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else res.send(data);
    })
});
app.get("/search-product",function (req,res) {
    const q = req.query.q;
    const sql_txt = `select * from product where name like '%${q}%'`;
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else res.send(data);
    })
})
app.get("/detail-product",function (req,res) {
    const id = req.query.id;
    const sql_txt = "select * from product where id = "+id;
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else if(data.length ==0)
            res.send("404 not found");
        else
            res.send(data[0]);
    })
})

