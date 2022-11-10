const http = require('http');
const fs = require('fs');
const qs = require('qs');
const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./todo.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const InfoToList = qs.parse(data);
            fs.readFile('./display.html', 'utf8', function (err, datahtml) {
                if (err) {
                    console.log(err);
                }
                datahtml = datahtml.replace('{ToList}', InfoToList.toList);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(datahtml);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(3080, ()=> {})
