const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbpenjualan'
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//tampilkan semua data product
app.get('/api/barang',(req, res) => {
  let sql = "SELECT * FROM barang";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//tampilkan data product berdasarkan id
app.get('/api/barang/:id',(req, res) => {
  let sql = "SELECT * FROM barang WHERE idbarang='"+ req.params.id +"'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//Tambahkan data product baru
app.post('/api/barang',(req, res) => {
  let data = {idbarang: req.body.idbarang, 
                namabarang: req.body.namabarang,
                hargabeli: req.body.hargabeli,
                hargajual: req.body.hargajual,
                stok: req.body.stok,
                idsupplier: req.body.idsupplier,
                expired: req.body.expired
              };  

  let sql = "INSERT INTO barang SET ?";

  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//Edit data product berdasarkan id
app.put('/api/barang/:id',(req, res) => {
  let sql = "UPDATE barang SET namabarang = '"+ req.body.namabarang +"', hargabeli = "+ req.body.product_price +",  ";
  sql += "hargajual = "+ req.body.product_price +", stok = "+ req.body.stok +", idsupplier = '"+ req.body.idsupplier +"', ";
  sql += "expired = '"+ req.body.expired +"' WHERE idbarang= '"+ req.body.idbarang + "'";

  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//Delete data product berdasarkan id
app.delete('/api/barang/:id',(req, res) => {
  let sql = "DELETE FROM barang WHERE idbarang ='"+req.params.id+"'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//Server listening
app.listen(3000,() =>{
    console.log("server listening on http://localhost:3000");
});