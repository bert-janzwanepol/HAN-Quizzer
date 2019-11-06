import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';

import { } from '../reducers/score'

class AnswersUI extends Component {

    render() {
        return (
            <ul>
                <li>
                    Antwoord 1
                </li>
                <li>
                    Antwoord 2
                </li>
                <li>
                    Antwoord 3
                </li>
            </ul>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        question: state.score.question
    }
}

const Answers = ReactRedux.connect(mapStateToProps)(AnswersUI);

export default Answers;