import produce from "immer";

const initialState = {
    roundNumber: 0,
    questionNumber: 0,
    question: '',
    questionId: '',
    questionClosed: false,
    answer: '',
    teams: [],
    standings: []
}

export const TEAMS_RECEIVED = 'TEAMS_RECEIVED';
export const NEW_QUESTION = 'NEW_QUESTION';
export const CLOSE_QUESTION = 'CLOSE_QUESTION';
export const OPEN_QUESTION = 'OPEN_QUESTION';
export const NEW_STANDINGS = 'NEW_STANDINGS';

export const fetchTeamsAction = (json) => {
    return {
        type: TEAMS_RECEIVED,
        json
    }
}

export const setStandingsAction = (standings) => {
    return {
        type: NEW_STANDINGS,
        standings
    }
}

export const setNewQuestionAction = (question, roundNumber, questionNumber, questionId) => {
    return { type: NEW_QUESTION, question, roundNumber, questionNumber, questionId }
}

export const closeQuestion = () => {
    return { type: CLOSE_QUESTION }
}

export const openQuestion = () => {
    return { type: OPEN_QUESTION }
}


export const scoreReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case TEAMS_RECEIVED:
            draft.teams = action.json;
            return draft;

        case NEW_QUESTION:
            draft.question = action.question;
            draft.questionId = action.questionId;
            draft.roundNumber = action.roundNumber;
            draft.questionNumber = action.questionNumber;
            break;

        case OPEN_QUESTION:
            draft.questionClosed = false;
            break;

        case CLOSE_QUESTION:
            draft.questionClosed = true;
            break;

        case NEW_STANDINGS:
            draft.standings = action.standings
            return draft

        default:
            return draft
    }
})

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

// export const getQuestion = (questionId, roundNumber, questionNumber) => {
//     return (dispatch) => {
//         fetch('http://localhost:3000/questions/' + questionId,
//             {
//                 headers: {
//                     token: sessionStorage.getItem('token')
//                 }
//             })
//             .then(res => res.json())
//             .then(json => {
//                 dispatch(setNewQuestionAction(json, roundNumber, questionNumber, questionId))
//                 dispatch(openQuestion())
//             })
//     }
// }

export const getStandings = (roomkey) => {
    return (dispatch) => {
        fetch('http://localhost:3000/games/' + roomkey + '/teams/standings', {
            headers: {
                token: sessionStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(json => dispatch(setStandingsAction(json)))
    }
}

export const getQuestion = (questionId, roundNumber, questionNumber) => {
    return (dispatch) => {
        fetch('http://localhost:3000/questions/' + questionId,
            {
                headers: {
                    token: sessionStorage.getItem('token')
                }
            })
            .then(res => res.json())

    }
}