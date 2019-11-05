import produce from 'immer';
import { connect } from '@giantmachines/redux-websocket';

export const CREATE_GAME = 'CREATE_GAME';
export const ROUND_STARTED = 'ROUND_STARTED';

export const CATEGORIES_RECEIVED = 'CATEGORIES_RECEIVED';
export const CATEGORY_SELECTED = 'CATEGORY_SELECTED';
export const CATEGORY_DESELECTED = 'CATEGORY_DESELECTED';

export const QUESTIONS_RECEIVED = 'QUESTIONS_RECEIVED';
export const QUESTION_SELECTED = 'QUESTION_SELECTED';
export const QUESTION_DESELECTED = 'QUESTION_DESELECTED';
export const QUESTION_STARTED = 'QUESTION_STARTED';
export const QUESTION_STOPPED = 'QUESTION_STOPPED';

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

export const setCategorySelectedAction = (category) => {
    return { type: CATEGORY_SELECTED, category }
}

export const setCategoryDeselectedAction = (category) => {
    return { type: CATEGORY_DESELECTED, category }
}

export const getRoundQuestionsAction = (questions) => {
    return { type: QUESTIONS_RECEIVED, questions }
}

export const setRoundQuestionAction = (question) => {
    return { type: QUESTION_SELECTED, question }
}

const initialState = {
    game: [],
    categories: [],
    selectedCategories: [],
    newRoundStarted: false,
    roundNumber: 0,
    questions: [],
    selectedQuestionIndex: 0
}

export const gameReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case CREATE_GAME:
            draft.game = action.game;
            break;

        case CATEGORIES_RECEIVED:
            draft.categories = action.categories;
            break;

        case CATEGORY_SELECTED:
            draft.selectedCategories.push(action.category)
            break

        case CATEGORY_DESELECTED:
            draft.selectedCategories.splice(draft.selectedCategories.indexOf(action.category), 1)
            break;

        case QUESTION_SELECTED:
            draft.selectedQuestionIndex = action.question
            break

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

        case QUESTIONS_RECEIVED:
            draft.questions = action.questions
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

export const startGame = (roomkey) => {
    return (dispatch) => {
        fetch('http://localhost:3000/games/' + roomkey + '/start', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                token: sessionStorage.getItem('token')
            }
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

export const setRoundCategories = (roomkey, roundnumber, event, categories) => {
    event.preventDefault();

    return (dispatch) => {
        fetch('http://localhost:3000/games/' + roomkey + '/rounds/' + roundnumber + '/categories',
            {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    token: sessionStorage.getItem('token')
                },
                body: JSON.stringify({ categories: categories })
            })
    }
}

export const fetchRoundQuestions = (roomkey, roundnumber) => {
    return (dispatch) => {
        fetch('http://localhost:3000/games/' + roomkey + '/rounds/' + roundnumber + '/askedquestions/suggestions',
            {
                headers: {
                    token: sessionStorage.getItem('token')
                },
            })
            .then(res => res.json())
            .then(json => dispatch(getRoundQuestionsAction(json.questions)))
    }
}

export const openQuestion = (roomkey, roundnumber, event, questionId) => {
    event.preventDefault();

    return (dispatch) => {
        fetch('http://localhost:3000/games/' + roomkey + '/rounds/' + roundnumber + '/askedquestions',
            {
                method: 'post',
                headers: {
                    token: sessionStorage.getItem('token')
                },
                body: JSON.stringify({ questionId: questionId })
            })
    }
}