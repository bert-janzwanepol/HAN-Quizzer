var ws = require('ws')
// een import voor alle on message van verschillende sockets

exports.createServer = (httpServer) => {
    var wss = new ws.Server({
        server: httpServer
    })

    wss.on('connection', socket => {
        console.log('New connection');
        console.log('Current sockets: ', wss.clients.size);
        console.log(socket.id)
    })
}

// game = [
//     {
//         quizmaster: socket,
//         teams: [sockets],
//         scoreboard: socket
//     },
//     {
//         quizmaster: socket,
//         teams: [sockets],
//         scoreboard: socket
//     }
// ]