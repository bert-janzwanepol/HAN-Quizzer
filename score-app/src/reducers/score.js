import produce from "immer";

const initialState = {
    roundNumber: 0,
    questionNumber: 0,
    question: '',
    questionId: '',
    questionClosed: false,
    answer: '',
    teams: [],
    standings: [],
    answers: [],
    gameclosed: false
}

export const TEAMS_RECEIVED = 'TEAMS_RECEIVED';
export const NEW_QUESTION = 'NEW_QUESTION';
export const CLOSE_QUESTION = 'CLOSE_QUESTION';
export const OPEN_QUESTION = 'OPEN_QUESTION';
export const NEW_STANDINGS = 'NEW_STANDINGS';
export const NEW_ROUND = 'NEW_ROUND'
export const CLOSE_GAME = 'CLOSE_GAME'

export const setTeamsAction = (json) => {
    return {
        type: TEAMS_RECEIVED,
        json
    }
}

export const closeGameAction = () => {
    return {
        type: CLOSE_GAME
    }
}

export const startRoundAction = () => {
    return {
        type: NEW_ROUND
    }
}

export const setStandingsAction = (standings) => {
    return {
        type: NEW_STANDINGS,
        standings
    }
}

export const setQuestionAction = (question) => {
    return { type: NEW_QUESTION, question }
}

export const getAnswersAction = (answers) => {
    return { type: CLOSE_QUESTION, answers }
}

export const openQuestion = () => {
    return { type: OPEN_QUESTION }
}


export const scoreReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case TEAMS_RECEIVED:
            draft.teams = action.json
            return draft

        case NEW_QUESTION:
            draft.answers = []
            draft.questionNumber++
            draft.question = action.question
            return draft

        case OPEN_QUESTION:
            draft.questionClosed = false
            return draft

        case CLOSE_QUESTION:
            draft.answers = action.answers
            draft.questionClosed = true
            return draft

        case NEW_ROUND:
            draft.roundNumber++
            draft.questionNumber = 0
            return draft

        case NEW_STANDINGS:
            draft.standings = action.standings
            return draft

        case CLOSE_GAME:
            draft.gameclosed = true
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
                dispatch(setTeamsAction(json.teams))
            });
    }

}

export const getQuestion = (questionId) => {
    return (dispatch) => {
        fetch('http://localhost:3000/questions/' + questionId,
            {
                headers: {
                    token: sessionStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(question => {
                dispatch(setQuestionAction(question))
                dispatch(openQuestion())
            })
    }
}

export const getStandings = (roomkey) => {
    return (dispatch) => {
        fetch('http://localhost:3000/games/' + roomkey + '/teams/standings', {
            headers: {
                token: sessionStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(standings => dispatch(setStandingsAction(standings)))
    }
}

export const getAnswers = (roomkey, roundNumber, questionNumber) => {
    return (dispatch) => {
        fetch('http://localhost:3000/games/' + roomkey + '/rounds/' + roundNumber + '/askedquestions/' + questionNumber + '/answers', {
            headers: {
                token: sessionStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(answers => dispatch(getAnswersAction(answers)))
    }
}