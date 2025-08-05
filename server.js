const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Serve static files from public folder
app.use(express.static(path.join(__dirname, '../public')));

// Socket.io connections
io.on('connection', (socket) => {
    socket.on('join', (name) => {
        socket.username = name;
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log('Server listening on port', PORT);
});
