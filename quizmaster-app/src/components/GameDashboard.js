import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';


import TeamList from './TeamList';

import { createGame, startGame } from '../reducers/game';

import CategoryList from './CategoryList';
import TitleMessage from './TitleMessage';

class GameDashboardUI extends Component {

    componentDidMount() {
        if (this.props.game.length !== undefined) this.props.createGame();
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
                            <button onClick={() => this.props.startGame(this.props.game.password)}>Start spel</button>
                        </div>

                        :
                        <div>
                            <TitleMessage title={`Ronde ${this.props.roundNumber}. Kies 3 categorieën`} />
                            <CategoryList />
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
        startGame: (roomkey) => dispatch(startGame(roomkey)),
        stopGame: () => { },
        openRound: () => { },
    }
}

const GameDashboard = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(GameDashboardUI);

export default GameDashboard;