import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoadingIndicator from './LoadingIndicator';
import TitleMessage from './TitleMessage';

import { setInputFieldAction, setRoomPasswordAction, submitTeam } from '../reducers/application'

class SignupFormUI extends Component {

    render() {
        let message = this.props.awaitingConfirmation ? this.props.waitingMessage : this.props.welcomeMessage;

        return (
            (this.props.approved && <Redirect to="/question" />) ||

            (!this.props.awaitingConfirmation
                ?
                <div>
                    <TitleMessage title={message} />
                    <form>
                        <label htmlFor="teamName">Teamnaam</label>
                        <input value={this.props.teamName} onChange={e => this.props.setTeamName(e.target.value)} type="text" name="teamName" id="teamName" required />
                        {this.props.errorMessage && <small className='form-error-message'>{this.props.errorMessage}</small>}
                        <label htmlFor="roomKey">Roomkey</label>
                        <input value={this.props.roomkey} onChange={e => this.props.setRoomPassword(e.target.value)} type="text" name="roomKey" id="roomKey" required />
                        <button type="submit" onClick={(e) => this.props.submitTeam(this.props.teamName, this.props.roomkey, e)}>create team</button>
                    </form>
                </div>
                :
                <div>
                    <TitleMessage title={message} />
                    <LoadingIndicator />
                </div>)
        )
    }

}

const mapStateToProps = (state) => {
    return {
        teamName: state.application.teamName,
        roomkey: state.application.roomkey,

        awaitingConfirmation: state.application.awaitingConfirmation,
        approved: state.application.approved,

        errorMessage: state.application.errorMessage,
        waitingMessage: state.application.waitingMessage,
        welcomeMessage: state.application.welcomeMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTeamName: (name) => dispatch(setInputFieldAction(name)),
        setRoomPassword: (password) => dispatch(setRoomPasswordAction(password)),
        submitTeam: (name, roomkey, event) => dispatch(submitTeam(name, roomkey, event))
    }
}

const SignupForm = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SignupFormUI);

export default SignupForm;