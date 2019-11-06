import produce from "immer";
import { connect } from '@giantmachines/redux-websocket';

const initialState = {
    roomkey: '',
    errorMessage: '',
    authenticated: false
}

export const SET_ROOM_KEY = 'SET_ROOM_KEY';
export const LOGIN_SUCCES = 'LOGIN_SUCCES';
export const LOGIN_ERROR = 'SET_INPUT_FIELD';

export const setRoomPasswordAction = (password) => {
    return {
        type: SET_ROOM_KEY,
        password
    }
}

export const loginErrorAction = (error) => {
    return {
        type: LOGIN_ERROR,
        error
    }
}

export const loginSuccesAction = () => {
    return {
        type: LOGIN_SUCCES
    }
}

export const applicationReducer = produce((draft = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCES:
            draft.authenticated = true;
            return draft;

        case LOGIN_ERROR:
            draft.errorMessage = action.error
            break;

        case SET_ROOM_KEY:
            draft.roomkey = action.password
            break;

        default:
            return draft
    }
})

export const login = (roomkey, event) => {
    event.preventDefault();

    return (dispatch) => {
        if (!roomkey) {
            let error = "Room key mag niet leeg zijn";
            dispatch(loginErrorAction(error));

            return;
        } else {
            dispatch(connect('ws://localhost:3000'))
            dispatch(loginSuccesAction())
        }
    }
}