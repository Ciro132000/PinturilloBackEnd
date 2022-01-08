const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
const options = {
  cors: {
    origin: 'http://localhost:4200',
  },
};

const server = require('http').Server(app);
const io = require('socket.io')(server, options);



io.on('connection', (socket)=>{
    const idHandShake = socket.id;

    const { nameRoom } = socket.handshake.query;

    console.log(`Hola dispositivo: ${idHandShake} se unio ${nameRoom}`)

    socket.join(nameRoom);

    socket.on('event', (res)=>{
       console.log(res);
       
       socket.to(nameRoom).emit('event', res);
    });


})

server.listen(5000, ()=>{
    console.log('>> Socket listo y escuchando en el puerto: 5000')
})