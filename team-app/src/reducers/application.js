import produce from "immer";
import { connect } from '@giantmachines/redux-websocket';

const initialState = {
    teamName: '',
    roomkey: '',
    awaitingConfirmation: false,
    errorMessage: '',
    approved: false,
    waitingMessage: 'Awaiting confirmation of the quizmaster',
    welcomeMessage: 'Please enter a teamname :)'
}

// ACTION NAMES
export const SEND_APPLICATION = 'SEND_APPLICATION';
export const SET_REJECTION_MESSAGE = 'SET_REJECTION_MESSAGE';
export const TEAM_ACCEPTED = 'TEAM_ACCEPTED';
export const TEAM_APPROVED = 'TEAM_APPROVED'
export const SET_INPUT_FIELD = 'SET_INPUT_FIELD';
export const SET_ROOM_KEY = 'SET_ROOM_KEY';
export const SET_WAIT_STATUS = 'SET_WAIT_STATUS';

// ACTION CREATORS
export const submitTeamAction = (name, roomkey, event) => {
    return {
        type: SEND_APPLICATION,
        name, roomkey,
        event
    }
}

export const rejectTeamAction = (message) => {
    return {
        type: SET_REJECTION_MESSAGE,
        message
    }
}

export const acceptTeamAction = (token) => {
    return {
        type: TEAM_ACCEPTED,
        token
    }
}

export const approveTeamAction = (status) => {
    return { type: TEAM_APPROVED, status }
}

export const setWaitStatusAction = (status) => {
    return {
        type: SET_WAIT_STATUS,
        status
    }
}

export const setInputFieldAction = (name) => {
    return {
        type: SET_INPUT_FIELD,
        name
    }
}

export const setRoomPasswordAction = (password) => {
    return {
        type: SET_ROOM_KEY,
        password
    }
}

// Signup reducer
export const applicationReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case SEND_APPLICATION:
            action.event.preventDefault();
            return draft;

        case TEAM_ACCEPTED:
            sessionStorage.setItem('token', action.token);
            break;

        case TEAM_APPROVED:
            draft.approved = action.status;
            break;

        case SET_WAIT_STATUS:
            draft.awaitingConfirmation = action.status
            break;

        case SET_REJECTION_MESSAGE:
            draft.errorMessage = action.message
            break;

        case SET_INPUT_FIELD:
            draft.teamName = action.name
            break;

        case SET_ROOM_KEY:
            draft.roomkey = action.password
            break;

        default:
            return draft
    }
})


// ASYNC ACTIONS

export const submitTeam = (name, roomkey, event) => {
    event.preventDefault(); // don't reload the page

    return (dispatch) => {
        // check if name and roomkey are valid
        if (!name || !roomkey) {
            let error = "Naam en/of room key mag niet leeg zijn";
            dispatch(rejectTeamAction(error));

            return;
        }

        dispatch(rejectTeamAction("")); // reset error message to empty string
        dispatch(setWaitStatusAction(true)); // show loading icon

        // post to the right room by using the roomkey
        return fetch('http://localhost:3000/games/' + roomkey + '/teams', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name
            })
        })
            .then(handleSubmitErrors)
            .then(res => res.json())
            .then(json => {
                if (json.error) dispatch(rejectTeamAction(json.error))

                if (json.token) {
                    // set jwt
                    dispatch(acceptTeamAction(json.token));

                    // connect to websocketserver
                    dispatch(connect('ws://localhost:3000'));
                }
            })
            .catch((error) => {
                dispatch(setWaitStatusAction(false));
                dispatch(rejectTeamAction(error.message));
            })
    }
}

const handleSubmitErrors = (res) => {

    if (res.status === 401) throw new Error('Room niet gevonden!');
    if (res.status === 409) throw new Error('Er bestaat al een team met deze naam!');

    return res;
}