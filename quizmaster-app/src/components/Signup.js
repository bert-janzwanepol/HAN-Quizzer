import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import { Redirect } from 'react-router-dom';

import { approveQuizmasterAction, rejectQuizmasterAction, setKeyAction, quizmasterLogin } from '../reducers/authentication'

class SignupFormUI extends Component {
    render() {
        return (
            this.props.authenticated
                ?
                <Redirect to='/game' />
                :
                <form>
                    <h1>Quizmaster login:</h1>
                    <label htmlFor="roomKey">Quizmaster naam:</label>
                    <input value={this.props.quizmasterKey} onChange={e => this.props.setKey(e.target.value)} type="text" name="quizmasterKey" id="quizmasterKey" required />
                    {this.props.errorMessage && <small className='form-error-message'>{this.props.errorMessage}</small>}
                    <button type="submit" onClick={(e) => this.props.login(this.props.quizmasterKey, e)}>login</button>
                </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        quizmasterKey: state.authentication.quizmasterKey,
        authenticated: state.authentication.authenticated,
        errorMessage: state.authentication.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        grantAccess: () => dispatch(approveQuizmasterAction()),
        denyAccess: (message) => dispatch(rejectQuizmasterAction(message)),
        setKey: (value) => dispatch(setKeyAction(value)),
        login: (password, event) => dispatch(quizmasterLogin(password, event))
    }
}

const SignupForm = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SignupFormUI)

export default SignupForm;