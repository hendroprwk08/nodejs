var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;

    console.log( q );

    switch ( req.url){
        case '/':
            fs.readFile("index.html", (err, data) => {
                if (err) { // kirim balasan error
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not Found");
                } 
                // kirim form login_form.html
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
            break;
        default:
            // baca file
            fs.readFile(filename, function(err, data) {
                if (err) { // kirim balasan error
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not Found");
                } 
                // kirim balasan dengan isi file statis
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        
    }
    
    
    
}).listen(8000);

console.log('server is running on http://localhost:8000');