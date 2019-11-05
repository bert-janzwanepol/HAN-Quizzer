import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import { withRouter } from "react-router";

import TeamList from './TeamList';

import { createGame, newRoundStartAction } from '../reducers/game';

import CategoryList from './CategoryList';
import TitleMessage from './TitleMessage';

class GameDashboardUI extends Component {

    componentDidMount() {
        this.props.createGame();
    }

    render() {
        return (
            <div className="dashboard">
                {
                    !this.props.newRoundStarted
                        ?
                        this.props.game.length !== 0 &&
                        <div>
                            <h1>Spel id: {this.props.game.password}</h1>
                            <TeamList />
                            <button onClick={() => this.props.startGame()}>Start spel</button>
                        </div>

                        :
                        <div>
                            <TitleMessage title={`Ronde ${this.props.roundNumber}. Kies 3 categorieën`} />
                            <CategoryList />
                            <button onClick={() => this.props.history.push('/game/round')}>Start ronde</button>
                            <button className="button--secondary">Stop spel</button>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.game.teams,
        game: state.game.game,
        newRoundStarted: state.game.newRoundStarted,
        roundNumber: state.game.roundNumber
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGame: () => dispatch(createGame()),
        startGame: () => dispatch(newRoundStartAction(true)),
        stopGame: () => { },
        openRound: () => { },
    }
}

const GameDashboard = withRouter(ReactRedux.connect(mapStateToProps, mapDispatchToProps)(GameDashboardUI));

export default GameDashboard;