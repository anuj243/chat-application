//node server will we handle socket io connections



const io = require('socket.io')(8000)//instance of htpp

const users= {};

io.on('connection', socket =>{  //instance of socket.io //agr connection hua toh kya hoga 
    socket.on('new-user-joined', name =>{    // agr connection ke andr user jiined event hua toh kya hoga
        console.log(name); 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });  
    
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})