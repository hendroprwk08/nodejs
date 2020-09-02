const express = require('express');
const app = express();
const mysql = require('mysql');

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
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({"status": 200, "response": results}));
  });
});

//tampilkan data product berdasarkan id
app.get('/api/barang/:id',(req, res) => {
  let sql = "SELECT * FROM barang WHERE idbarang='"+ req.params.id +"'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({"status": 200, "response": results}));
  });
});

//Tambahkan data product baru
app.post('/api/barang',(req, res) => {
  var data = req.query;
  //console.log(data);

  let sql = "INSERT INTO barang values('"+ data.id +"', '"+ data.nama +"', " 
            + data.beli +", "+ data.jual +", "+ data.stok +", '"+ data.supplier +"', "
            + "'"+ data.expired +"')";

  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({"status": 200, "response": results}));
  });
});

//Edit data product berdasarkan id
app.put('/api/barang/',(req, res) => {
  var data = req.query;
  
  let sql = "UPDATE barang SET namabarang = '"+ data.nama +"', hargabeli = "+ data.beli +",  ";
  sql += "hargajual = "+ data.jual +", stok = "+ data.stok +", idsupplier = '"+ data.supplier +"', ";
  sql += "expired = '"+ data.expired +"' WHERE idbarang = '"+ data.id + "'";

  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({"status": 200, "response": results}));
  });
});

//Delete data product berdasarkan id
app.delete('/api/barang/:id',(req, res) => {
  let sql = "DELETE FROM barang WHERE idbarang ='"+req.params.id+"'";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({"status": 200, "response": results}));
  });
});

//Server listening
app.listen(3000,() =>{
    console.log("server listening on http://localhost:3000");
});