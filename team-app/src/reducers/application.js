import produce from "immer";
import * as Redux from 'redux';
const initialState = {
    teamName: '',
    roomkey: '',
    awaitingConfirmation: false,
    errorMessage: ''
}

// ACTION NAMES
export const SEND_APPLICATION = 'SEND_APPLICATION';
export const SET_REJECTION_MESSAGE = 'SET_REJECTION_MESSAGE';
export const TEAM_ACCEPTED = 'TEAM_ACCEPTED';
export const SET_TEAM_NAME = 'SET_TEAM_NAME';
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

export const setWaitStatusAction = (status) => {
    return {
        type: SET_WAIT_STATUS,
        status
    }
}

export const setTeamNameAction = (name) => {
    return {
        type: SET_TEAM_NAME,
        name
    }
}

export const setRoomPasswordAction = (password) => {
    return {
        type: SET_ROOM_KEY,
        password
    }
}

// ASYNC ACTIONS

export const submitTeam = (name, roomkey, event) => {
    event.preventDefault(); // don't reload the page
    console.log(name);

    return (dispatch) => {
        // check if name and roomkey are valid
        if (!name || !roomkey) {
            let error = "Naam en/of room key mag niet leeg zijn";
            dispatch(rejectTeamAction(error));

            return;
        }

        dispatch(rejectTeamAction("")); // reset error message to empty string
        dispatch(setWaitStatusAction(true)); // show loading icon

        // fetch the game by roomkey
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
            .then(res => res.json())
            .then(json => {
                if (json.error) dispatch(rejectTeamAction(json.error))
                if (json.token) dispatch(acceptTeamAction(json.token))

                let socket = new WebSocket('ws://localhost:3000');
                socket.onopen = () => {
                    let initMessage = {
                        initial: true,
                        password: roomkey,
                        token: json.token
                    }

                    socket.send(JSON.stringify(initMessage))
                }

                dispatch(setWaitStatusAction(false));
            })
    }
}

// Signup reducer
const applicationReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case SEND_APPLICATION:
            action.event.preventDefault();
            return draft;
        case TEAM_ACCEPTED:
            sessionStorage.setItem('token', action.token);
            break;

        case SET_WAIT_STATUS:
            draft.awaitingConfirmation = action.status
            break;

        case SET_REJECTION_MESSAGE:
            draft.errorMessage = action.message
            break;

        case SET_TEAM_NAME:
            draft.teamName = action.name
            break;

        case SET_ROOM_KEY:
            draft.roomkey = action.password
            break;

        default:
            return draft
    }
})


export const mainReducer = Redux.combineReducers({
    application: applicationReducer
})