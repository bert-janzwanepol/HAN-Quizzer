const ws = require('ws')
const jwt = require('jsonwebtoken')

const games = []
var wss = null;

exports.createServer = (httpServer) => {
    wss = new ws.Server({
        noServer: true,
        server: httpServer
    })

    wss.on('connection', socket => {
        console.log('new connection | current sockets: ', wss.clients.size)

        socket.on('message', incoming => {
            console.log('incoming message')
            const message = JSON.parse(incoming)
            if (message.initial) {
                handleInitMessage(message, socket)
            } else {
                switch (socket.role) {
                    case 'quizmaster':
                        break
                    case 'team':
                        break
                    case 'scoreboard':
                        break
                    default:
                        break
                }
            }
        })
    })

    wss.broadcast = (message, gamepassword, ...recipients) => {
        const game = games.find(g => g.password === gamepassword)
        if (game) {
            if (recipients.includes('quizmaster')) sendJSON(message, game.quizmaster)
            if (recipients.includes('teams')) game.teams.forEach(team => sendJSON(message, team))
            if (recipients.includes('scoreboard')) sendJSON(message, game.scoreboard)
        }
    }

    wss.sendToTeam = (message, gamepassword, teamname) => {
        const game = games.find(g => g.password === gamepassword)
        if (game) {
            const team = game.teams.find(t => t.name === teamname)
            if (team) {
                team.sendJSON(message)
            }
        }
    }

    return wss
}


function sendJSON(message, socket) {
    socket.send(JSON.stringify(message))
}

/**
 * This function handles the first message send after a connection is established
 * It is created so that the socket can identify itself using the JWT
 */
function handleInitMessage(message, socket) {
    const data = message
    data.jwtinfo = jwt.verify(data.token, process.env.JWT_SECRET)

    socket.role = data.jwtinfo.role
    socket.name = data.jwtinfo.name

    switch (socket.role) {
        case 'quizmaster':
            games.push({
                password: data.password,
                quizmaster: socket,
                teams: [],
                scoreboard: null
            })
            console.log('current games: ', games.length)
            break
        case 'team':
            games.find(game => game.password === data.password).teams.push(socket)
            break
        case 'scoreboard':
            games.find(game => game.password === data.password).scoreboard = socket
            break
        default:
            break
    }
}