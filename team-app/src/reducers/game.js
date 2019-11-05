import produce from "immer";
// import { connect } from '@giantmachines/redux-websocket';

import { SET_INPUT_FIELD } from './application';
export const GAME_STARTED = 'GAME_STARTED';
export const GET_QUESTION = 'GET_QUESTION';
export const NEW_QUESTION = 'NEW_QUESTION';

// ACTION CREATORS
export const startGameAction = () => {
    return {
        type: GAME_STARTED
    }
}

export const getQuestionAction = (questionId) => {
    return { type: GET_QUESTION, questionId }
}

export const setNewQuestionAction = (question) => {
    return { type: NEW_QUESTION, question }
}

const initialState = {
    question: '',
    answer: '',
    gameStarted: false,
    roundStarted: false,
    waitingForQuestion: true,
    waitingForQuestionMsg: 'Waiting for the next question',
    waitingForStartMsg: 'Waiting for the game to start',
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
            break;

        default:
            return draft
    }
})

export const getQuestion = (roomkey, roundnumber, questionNumber) => {
    return (dispatch) => {
        fetch('http://localhost:3000/games/' + roomkey + '/rounds/' + roundnumber + '/askedquestions/' + questionNumber,
            {
                headers: {
                    token: sessionStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(json => dispatch(setNewQuestionAction(json)))
    }
}