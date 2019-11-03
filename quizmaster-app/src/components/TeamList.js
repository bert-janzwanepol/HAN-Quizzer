import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';

import { toggleTeamStatusAction } from '../reducers/application';
import { fetchTeams } from '../reducers/game'

class TeamListUI extends Component {

    render() {
        console.log(this.props)
        let deniedList, acceptedList;

        if (this.props.teams) {
            deniedList = this.props.teams.filter(team => team.approved === false).map(team => {
                return <li key={team.name} onClick={() => this.props.toggleTeamStatus()}>{team.name}</li>
            });

            acceptedList = this.props.teams.filter(team => team.approved === true).map(team => {
                return <li key={team.name} onClick={() => this.props.toggleTeamStatus()}>{team.name}</li>
            })
        }

        // const acceptedList = this.props.approved.map(team => {
        //     return <li key={team.name} onClick={() => this.props.toggleTeamStatus()}>{team.name}</li>
        // })

        return (
            <div className="team-lists">
                <div>
                    <h2>Doen mee:</h2>
                    <ul>
                        {deniedList}
                    </ul>
                </div>
                <div>
                    <h2>Doen niet mee:</h2>
                    <ul>
                        {acceptedList}
                    </ul>
                </div>
                <button onClick={this.props.fetchTeams()}></button>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        approved: state.application.approved,
        denied: state.application.denied,
        teams: state.game.game.teams
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleTeamStatus: (approved) => dispatch(toggleTeamStatusAction(approved)),
        fetchTeams: () => dispatch(fetchTeams())
    }
}

const TeamList = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TeamListUI)

export default TeamList;