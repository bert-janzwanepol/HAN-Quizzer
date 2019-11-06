import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import { fetchTeams } from '../reducers/score'

class TeamListUI extends Component {

    componentDidMount() {
        this.props.getTeams(this.props.roomkey)
    }

    render() {
        let tableRows

        if (this.props.standings.length > 0) {
            tableRows = this.props.standings.map((team, i) => {
                return (
                    <tr key={team.name + '-standing'}>
                        <td>{'#' + (i + 1)}</td>
                        <td key={team.name}>
                            {team.teamname}
                        </td>
                        {team.answersCorrect.map(a => <td key={team.name + '-standing'}> {a}/12 </td>)}
                        <td key={team.score}>
                            {team.totalRoundPoints}
                        </td>
                    </tr>
                )
            })
        } else if (this.props.teams) {
            tableRows = this.props.teams.filter(team => team.approved === true).map((team) => {
                return (
                    <tr key={team.name}>
                        <td key={team.name}>
                            {team.name}
                        </td>
                    </tr>
                )
            })
        }
        return (
            <div className="team-lists">
                <h3>Teams</h3>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Teamnaam</th>
                            {this.props.standings.length > 0 ? this.props.standings[0].answersCorrect.map((a, i) => {
                                return (
                                    <th key={'ronde-' + i}>Ronde {i + 1}</th>
                                )
                            }) : <th></th>}
                            <th>Totaal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.score.teams,
        roomkey: state.application.roomkey,
        standings: state.score.standings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTeams: (roomkey) => dispatch(fetchTeams(roomkey))
    }
}

const TeamList = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TeamListUI)

export default TeamList;