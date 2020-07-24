const SerialPort = require('serialport');

const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

//criando o server//
const app = express();
const server = http.createServer(app);

app.use(express.static('public')); //adiciona arquivos estaticos//

app.get('/', (req, res, next)=> {
    res.sendFile(_dirname + '/public/index.html')
});

server.listen(9999, () => {
    console.log('Porta 192.168.0.144:%d',server.address().port);
});
const io = socketIo.listen(server);




const Readline = SerialPort.parsers.Readline;
const parser = new Readline({ delimiter: '\r\n' });
const mySerial = new SerialPort("com5", {
    baudRate: 9600,
});
mySerial.pipe(parser);


mySerial.on('open', function () {
    console.log('CONEXAO SERIAL INICIADA');
    parser.on('data', function (data) {
        console.log(data);
        var dado = parseInt(((data * 100 / 1023)));
        console.log(dado);
        io.emit('serial:data',{
            value : dado.toString()
        });
    });
});


// Recebendo dados da web e passando pro serial//


io.sockets.on('connection',function(socket){
    console.log(' Um novo nó foi conectado');

    socket.on('btnAction',function(btn){
        var dado_web = btn.value;
        console.log(dado_web);
        mySerial.write(dado_web);
        console.log('Enviando"'+ dado_web + '"Para Serial');
    });
});