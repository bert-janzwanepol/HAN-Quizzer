import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import LoadingIndicator from './LoadingIndicator';

import { setTeamNameAction, setRoomPasswordAction, submitTeam } from '../reducers/application'

class SignupFormUI extends Component {
    render() {
        return (
            !this.props.awaitingConfirmation
                ? <form>
                    <label htmlFor="teamName">Teamnaam</label>
                    <input value={this.props.teamName} onChange={e => this.props.setTeamName(e.target.value)} type="text" name="teamName" id="teamName" required />
                    {this.props.errorMessage && <small className='form-error-message'>{this.props.errorMessage}</small>}
                    <label htmlFor="roomKey">Roomkey</label>
                    <input value={this.props.roomkey} onChange={e => this.props.setRoomPassword(e.target.value)} type="text" name="roomKey" id="roomKey" required />
                    <button type="submit" onClick={(e) => this.props.submitTeam(this.props.teamName, this.props.roomkey, e)}>create team</button>
                </form>
                : <LoadingIndicator />
        )
    }

}


const mapStateToProps = (state) => {
    return {
        awaitingConfirmation: state.application.awaitingConfirmation,
        roomkey: state.application.roomkey,
        teamName: state.application.teamName,
        errorMessage: state.application.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTeamName: (name) => dispatch(setTeamNameAction(name)),
        setRoomPassword: (password) => dispatch(setRoomPasswordAction(password)),
        submitTeam: (name, roomkey, event) => dispatch(submitTeam(name, roomkey, event))
    }
}

const SignupForm = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SignupFormUI);

export default SignupForm;