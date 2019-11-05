import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import { send } from '@giantmachines/redux-websocket';

import { fetchTeams } from '../reducers/game';

class CategoryDashBoardUi extends Component {

    render() {
        return (
            <div className="dashboard">
                <h1>Ronde 1: Kies een categorie</h1>
                <ul>
                    {teamList}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.game.teams,
        game: state.game.game,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTeams: () => { dispatch(fetchTeams()) }

    }
}

const CategoryDashBoard = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CategoryDashBoardUi)

export default CategoryDashBoard;