const http = require('http'), fs = require('fs');

http.createServer(function (req, res) {
    if(req.url === "/" && req.method === "GET"){
        fs.readFile("form-pendaftaran.html", (err, data) => {
            if (err) { // kirim balasan error
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            } 
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }

    if(req.url === "/" && req.method === "POST"){
        var temp_data = ""; //persiapan untuk tempat menampung data

        //1. tangkap data dahulu dan letakkan pada penampung
        req.on('data', function(data) {
            // tangkap data dari form
            temp_data += data;

            // kirim respon jika datanya terlalu besar
            if(temp_data.length > 1e7) {
              res.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
              res.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
            }
        });

        //2. selanjutnya di-parse dan tampilkan dalam bentuk html 
        req.on('end', function() {
            var params = new URLSearchParams(temp_data);
            
            //tampilkan htmlnya
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h2>Pendaftaranmu diterima</h2> ');
            res.write('<p>Nama: '+ params.get("nama") +'</p>');
            res.write('<p>Alamat: '+ params.get("alamat") +'</p>');
            res.write('<p>Asal Sekolah: '+ params.get("asal_sekolah") +'</p>');
            res.write('<p>Jenis Kelamin: '+ params.get("jenis_kelamin") +'</p>');
            res.write("<a href='/'>Daftar Lagi</a>");
            res.end();
        });
    }

}).listen(8000);

console.log('server is running on http://localhost:8000');