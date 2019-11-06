import produce from "immer";
// import { connect } from '@giantmachines/redux-websocket';

import { SET_INPUT_FIELD } from './application';
export const GAME_STARTED = 'GAME_STARTED';
export const GET_QUESTION = 'GET_QUESTION';
export const NEW_QUESTION = 'NEW_QUESTION';
export const SET_ANSWER = 'SET_ANSWER';
export const SET_SUBMIT_STATUS = 'SET_SUBMIT_STATUS';

// ACTION CREATORS
export const startGameAction = () => {
    return {
        type: GAME_STARTED
    }
}

export const getQuestionAction = (questionId) => {
    return { type: GET_QUESTION, questionId }
}

export const setNewQuestionAction = (question, roundNumber, questionNumber) => {
    return { type: NEW_QUESTION, question, roundNumber, questionNumber }
}

export const setAnswerAction = (value) => {
    return { type: SET_ANSWER, value }
}

export const setSubmitStatus = (status) => {
    return { type: SET_SUBMIT_STATUS, status }
}

const initialState = {
    question: '',
    answer: '',
    gameStarted: false,
    roundStarted: false,
    waitingForQuestion: true,
    waitingForQuestionMsg: 'Waiting for the next question',
    waitingForStartMsg: 'Waiting for the game to start',
    roundNumber: 0,
    questionNumber: 0,
    submitted: false
}

export const gameReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case SET_INPUT_FIELD:
            draft.answer = action.value
            break

        case GAME_STARTED:
            draft.gameStarted = true;
            break;

        case NEW_QUESTION:
            draft.question = action.question;
            draft.roundNumber = action.roundNumber;
            draft.questionNumber = action.questionNumber;
            break;

        case SET_ANSWER:
            draft.answer = action.value;
            break;

        case SET_SUBMIT_STATUS:
            draft.submitted = action.status;
            break;

        default:
            return draft
    }
})

export const getQuestion = (questionId, roundNumber, questionNumber) => {
    return (dispatch) => {
        fetch('http://localhost:3000/questions/' + questionId,
            {
                headers: {
                    token: sessionStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(json => dispatch(setNewQuestionAction(json, roundNumber, questionNumber)))
    }
}

export const submitAnswer = (event, roomkey, roundNumber, questionNumber, answer) => {
    event.preventDefault();

    return (dispatch) => {
        fetch('http://localhost:3000/games/' + roomkey + '/rounds/' + roundNumber + '/askedquestions/' + questionNumber + '/answers',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    token: sessionStorage.getItem('token')
                },
                body: JSON.stringify({ answer: answer })
            })
            .then(() => dispatch(setSubmitStatus(true)))
    }
}