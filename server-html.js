var http = require('http');

http.createServer(function (req, res) {
    //text/html adalah mime
    //untuk JSON application/json
    //untuk PDF application/pdf
    //untuk XML application/xml
    //cek disini: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    
    res.writeHead(200, {'Content-Type': 'text/html'}); 
    res.write('Hello <b>World</b>!');
    res.end();
}).listen(8000);

console.log("server running on http://localhost:8000");