import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import { Redirect } from 'react-router-dom';
import Logo from './Logo';
import { setRoomPasswordAction, login } from '../reducers/application';

class SignupFormUI extends Component {

    render() {

        return (
            !this.props.authenticated
                ?
                <div className="scoreboard-signup">
                    <Logo />
                    <h1>Scoreboard login:</h1>
                    <form>
                        <label htmlFor="roomKey">Roomkey</label>
                        <input value={this.props.roomkey} onChange={(e) => this.props.setRoomPassword(e.target.value)} type="text" name="roomKey" id="roomKey" required />
                        <button type="submit" onClick={(e) => this.props.login(this.props.roomkey, e)}>login</button>
                    </form>
                </div>
                :
                <Redirect to='/game' />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        roomkey: state.application.roomkey,
        error: state.application.errorMessage,
        authenticated: state.application.authenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRoomPassword: (password) => dispatch(setRoomPasswordAction(password)),
        login: (password, event) => dispatch(login(password, event)),
    }
}

const SignupForm = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SignupFormUI);

export default SignupForm;