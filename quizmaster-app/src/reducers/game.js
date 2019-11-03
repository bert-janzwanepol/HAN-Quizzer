import produce from 'immer';

export const CREATE_GAME = 'CREATE_GAME';
export const createGameAction = (game) => {
    return { type: CREATE_GAME, game }
}

export const FETCH_TEAMS = 'FETCH_TEAMS';
export const fetchTeamsAction = (teams) => {
    return { type: FETCH_TEAMS, teams }
}

const initialState = {
    game: []
}


export const gameReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case CREATE_GAME:
            draft.game = action.game;
            break;
        case FETCH_TEAMS:
            draft.game.teams = action.teams;
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: sessionStorage.getItem('token') })
        })
            .then(res => res.json())
            .then(json => dispatch(createGameAction(json)))
    }
}

export const fetchTeams = () => {
    return (dispatch) => {
        fetch('http://localhost:3000/team', {
            body: JSON.stringify({ token: sessionStorage.getItem('token') })
        })
            .then(res => res.json())
            .then(json => dispatch(fetchTeamsAction(json.teams)));
    }
}