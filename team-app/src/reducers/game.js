import produce from "immer";
// import { connect } from '@giantmachines/redux-websocket';

import { SET_INPUT_FIELD } from './application'

const initialState = {
    question: '',
    answer: '',
    started: false,
    waitingMessage: 'Waiting for the next question'
}

export const gameReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case SET_INPUT_FIELD:
            draft.answer = action.value
            break

        default:
            return draft
    }
})