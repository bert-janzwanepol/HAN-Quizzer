import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import { fetchTeams } from '../reducers/score'

class TeamListUI extends Component {

    componentDidMount() {
        this.props.getTeams(this.props.roomkey)
    }

    render() {
        let acceptedList;

        if (this.props.teams) {
            acceptedList = this.props.teams.filter(team => team.approved === true).map(team => {
                return <li key={team.name}>{team.name}</li>
            });
        }

        return (
            <div className="team-lists">
                <h3>Teams</h3>
                <ul>
                    {acceptedList}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.score.teams,
        roomkey: state.application.roomkey
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTeams: (roomkey) => dispatch(fetchTeams(roomkey))
    }
}

const TeamList = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TeamListUI)

export default TeamList;