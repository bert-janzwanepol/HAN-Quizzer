import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import TeamList from './TeamList'

import { toggleTeamStatusAction } from '../reducers/application'
import { createGame } from '../reducers/game'

class GameDashboardUI extends Component {
    render() {
        return (
            <div className="dashboard">
                {
                    this.props.game.length === 0
                        ?
                        <button className="createButton" onClick={() => this.props.createGame()}>Create game</button>
                        :
                        <div>
                            <h1>Spel id: {this.props.game.password}</h1>
                            <TeamList />
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        gamekey: state.application.gamekey,
        teams: state.application.teams,
        game: state.game.game
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGame: () => dispatch(createGame()),
        toggleTeamStatus: teamName => dispatch(toggleTeamStatusAction(teamName)),
    }
}

const GameDashboard = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(GameDashboardUI)

export default GameDashboard;