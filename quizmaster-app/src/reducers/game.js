import produce from 'immer';
import { connect, send } from '@giantmachines/redux-websocket';

export const CREATE_GAME = 'CREATE_GAME';
export const FETCH_TEAMS = 'FETCH_TEAMS';
export const SET_TEAM_STATUS = 'SET_TEAM_STATUS';
export const REDUX_WEBSOCKET_MESSAGE = 'REDUX_WEBSOCKET::MESSAGE';

export const createGameAction = (game) => {
    return { type: CREATE_GAME, game }
}

export const fetchTeamsAction = (teams) => {
    return { type: FETCH_TEAMS, teams }
}

export const setTeamStatusAction = (status, roomkey, teamname) => {
    return { type: SET_TEAM_STATUS, status, roomkey, teamname }
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
                dispatch(connect('ws://localhost:3000'));
            })
    }
}

export const fetchTeams = (roomkey) => {
    console.log(roomkey)
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

export const setTeamStatus = (status, roomkey, teamname) => {
    console.log(roomkey);
    return (dispatch) => {
        // dispatch(setWaitstatusAction())
        fetch('http://localhost:3000/games/' + roomkey + '/teams/' + teamname + '/approve',
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    token: sessionStorage.getItem('token')
                },
                body: JSON.stringify({ teamname: teamname })
            })
    }
}