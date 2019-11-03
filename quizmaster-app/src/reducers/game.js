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
            .then(json => dispatch(createGameAction(json)))
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