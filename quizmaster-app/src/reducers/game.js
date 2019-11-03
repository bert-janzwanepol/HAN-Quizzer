import produce from 'immer';

export const CREATE_GAME = 'CREATE_GAME';
export const createGameAction = (game) => {
    return { type: CREATE_GAME, game }
}

export const FETCH_TEAMS = 'FETCH_TEAMS';
export const fetchTeamsAction = (teams) => {
    return { type: FETCH_TEAMS, teams }
}

export const SET_TEAM_STATUS = 'SET_TEAM_STATUS';
export const setTeamStatusAction = (teamName, approved) => {
    return { type: SET_TEAM_STATUS, teamName, approved }
}

// WEBSOCKETS
export const WS_CONNECT = 'WS_CONNECT';
export const wsConnectAction = () => {
    return { type: WS_CONNECT }
}

export const WS_OPEN = 'WS_OPEN';
export const wsOpenAction = (socket) => {
    return { type: WS_OPEN, socket }
}

export const WS_MESSAGE = 'WS_MESSAGE';
export const wsMessageAction = (socket) => {
    return { type: WS_MESSAGE, socket }
}

const initialState = {
    game: [],
    socket: null
}

export const gameReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case CREATE_GAME:
            draft.game = action.game;
            break;
        case FETCH_TEAMS:
            draft.game.teams = action.teams;
            break;
        case SET_TEAM_STATUS:
            draft.game.teams = draft.game.teams.map(team =>
                team.name === action.teamName ? { ...team, approved: action.approved } : team
            )
            break;

        // WEBSOCKETS
        case WS_CONNECT:
            if (draft.game.socket !== null) draft.game.socket.close();

            return draft;

        case WS_OPEN:
            draft.game.socket = action.socket;
            let initMessage = {
                initial: true,
                password: draft.game.password,
                token: sessionStorage.getItem('token')
            }
            console.log(initMessage);

            draft.game.socket.send(JSON.stringify(initMessage))

            return draft;

        case WS_MESSAGE:

            return draft;

        default:
            return draft;
    }
})

export const createGame = () => {
    return (dispatch) => {
        fetch('http://localhost:3000/games', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                token: sessionStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(json => {
                dispatch(createGameAction(json))
                dispatch(connectWS());
            })
    }
}

export const fetchTeams = (roomkey) => {
    return (dispatch) => {
        fetch('http://localhost:3000/games/' + roomkey + '/teams',
            {
                headers: {
                    token: sessionStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(json => {
                dispatch(fetchTeamsAction(json.teams))
            });
    }
}

export const connectWS = () => {
    return dispatch => {
        dispatch(wsConnectAction);
        const socket = new WebSocket('ws://localhost:3000');

        socket.onopen = () => {
            dispatch(wsOpenAction(socket))
        }

        socket.onmessage = () => {

        }
    }
}