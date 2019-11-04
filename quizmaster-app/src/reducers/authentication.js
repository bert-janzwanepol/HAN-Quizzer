/* eslint-disable default-case */
import produce from 'immer';

const initalState = {
    quizmasterKey: '',
    authenticated: false,
    errorMessage: ''
}

export const SET_QUIZMASTER_KEY = 'SET_QUIZMASTER_KEY';
export const QUIZMASTER_KEY_APPROVED = 'QUIZMASTER_KEY_APPROVED';
export const QUIZMASTER_KEY_DENIED = 'QUIZMASTER_KEY_DENIED';

export const setKeyAction = (value) => {
    return { type: SET_QUIZMASTER_KEY, value }
}

export const approveQuizmasterAction = (token) => {
    return { type: QUIZMASTER_KEY_APPROVED, token }
}

export const rejectQuizmasterAction = (message) => {
    return { type: QUIZMASTER_KEY_DENIED, message }
}

export const authenticationReducer = produce((draft = initalState, action) => {
    switch (action.type) {
        case SET_QUIZMASTER_KEY:
            draft.quizmasterKey = action.value;
            break;

        case QUIZMASTER_KEY_APPROVED:
            draft.authenticated = true;
            sessionStorage.setItem('token', action.token);
            break;

        case QUIZMASTER_KEY_DENIED:
            draft.errorMessage = action.message;
            break;
        default:
            return draft;
    }
})


export const quizmasterLogin = (password, event) => {
    event.preventDefault();

    return (dispatch) => {
        if (!password) {
            let error = 'password mag niet leeg zijn'
            dispatch(rejectQuizmasterAction(error))

            return;
        }

        return fetch('http://localhost:3000/quizmaster/login', {
            method: 'post',
            // headers blijkbaar nodig omdat req.body anders undefined is
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: password })
        })
            .then(res => res.json())
            .then(json => {
                if (json.error) dispatch(rejectQuizmasterAction(json.error))
                if (json.token) dispatch(approveQuizmasterAction(json.token))
            })
    }
}