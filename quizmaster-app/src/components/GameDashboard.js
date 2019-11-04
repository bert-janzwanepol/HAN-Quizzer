import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import TeamList from './TeamList'

import { createGame } from '../reducers/game'
// import { initWS } from '../reducers/socket'

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
        teams: state.game.teams,
        game: state.game.game
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGame: () => { dispatch(createGame()) }
    }
}

const GameDashboard = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(GameDashboardUI)

export default GameDashboard;