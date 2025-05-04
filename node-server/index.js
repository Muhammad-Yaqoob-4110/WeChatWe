// Node server which will handle socket io connection

const io = require('socket.io')(8000)
const users = {};


console.log('Server is started on port 8000! Go and talk with your friend.');

io.on('connection',socket=>{
    socket.on('new-user-joined',name =>{
        // console.log("New user",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message, name: users[socket.id]})
    });

    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})