import produce from 'immer';
import { connect } from '@giantmachines/redux-websocket';

export const CREATE_GAME = 'CREATE_GAME';
export const ROUND_STARTED = 'ROUND_STARTED';
export const CATEGORIES_RECEIVED = 'CATEGORIES_RECEIVED';

export const FETCH_TEAMS = 'FETCH_TEAMS';
export const SET_TEAM_STATUS = 'SET_TEAM_STATUS';
export const REDUX_WEBSOCKET_MESSAGE = 'REDUX_WEBSOCKET::MESSAGE';

export const createGameAction = (game) => {
    return { type: CREATE_GAME, game }
}

export const fetchTeamsAction = (teams) => {
    return { type: FETCH_TEAMS, teams }
}

export const categoriesReceivedAction = (categories) => {
    return { type: CATEGORIES_RECEIVED, categories }
}

export const setTeamStatusAction = (status, roomkey, teamname) => {
    return { type: SET_TEAM_STATUS, status, roomkey, teamname }
}

export const newRoundStartAction = (status) => {
    return { type: ROUND_STARTED, status }
}


const initialState = {
    game: [],
    categories: [],
    newRoundStarted: false,
    roundNumber: 0
}

export const gameReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case CREATE_GAME:
            draft.game = action.game;
            break;

        case CATEGORIES_RECEIVED:
            draft.categories = action.categories;
            break;

        case FETCH_TEAMS:
            draft.game.teams = action.teams;
            break;

        case SET_TEAM_STATUS:
            draft.game.teams = draft.game.teams.map(team =>
                team.name === action.teamName ? { ...team, approved: action.approved } : team
            )
            break;

        case ROUND_STARTED:
            draft.newRoundStarted = action.status;
            draft.roundNumber++;
            break;

        // case CATEGORIES_SUBMITTED:
        //     draft.

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

export const fetchCategories = () => {

    return (dispatch) => {
        fetch('http://localhost:3000/categories/',
            {
                headers: {
                    token: sessionStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(json => {
                dispatch(categoriesReceivedAction(json.categories))
            });
    }
}