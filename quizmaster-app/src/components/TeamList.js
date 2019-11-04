import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';

import { fetchTeams, setTeamStatus } from '../reducers/game'

class TeamListUI extends Component {

    render() {
        let deniedList, acceptedList;

        if (this.props.teams) {
            acceptedList = this.props.teams.filter(team => team.approved === true).map(team => {
                return <li key={team.name}>{team.name}</li>
            });

            deniedList = this.props.teams.filter(team => team.approved === false).map(team => {
                return <li key={team.name} >
                    <span>{team.name}</span>

                    {/* accept button */}
                    <button className="icon-button accept" onClick={() => this.props.setTeamStatus(true, this.props.roomkey, team.name)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="check">
                            <polyline fill="none" stroke="#000" strokeWidth="1.1" points="4,10 8,15 17,4"></polyline>
                        </svg>
                    </button>

                    {/* reject button */}
                    <button className="icon-button reject" onClick={() => this.props.setTeamStatus(team.name, false)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="close"><path fill="none" stroke="#000" strokeWidth="1.06" d="M16,16 L4,4">
                        </path><path fill="none" stroke="#000" strokeWidth="1.06" d="M16,4 L4,16"></path>
                        </svg>
                    </button>
                </li>
            })
        }

        return (
            <>
                <div className="team-lists">
                    <div>
                        <h2>Doen niet mee:</h2>
                        <ul>
                            {deniedList}
                        </ul>
                    </div>
                    <div>
                        <h2>Doen mee:</h2>
                        <ul>
                            {acceptedList}
                        </ul>
                    </div>
                </div>
                <button onClick={() => this.props.fetchTeams(this.props.roomkey)}>Fetch Teams</button>
            </>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.game.game.teams,
        roomkey: state.game.game.password
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTeamStatus: (approved, roomkey, teamname) => dispatch(setTeamStatus(approved, roomkey, teamname)),
        fetchTeams: (roomkey) => dispatch(fetchTeams(roomkey))
    }
}

const TeamList = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TeamListUI)

export default TeamList;