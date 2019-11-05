import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import LoadingIndicator from './LoadingIndicator';
import TitleMessage from './TitleMessage';
import { setInputFieldAction } from '../reducers/application';

class QuestionUI extends Component {

    render() {
        let message = this.props.gameStarted ? this.props.waitingForQuestionMsg : this.props.waitingForStartMsg;

        return (

            this.props.started
                ?
                <>
                    <h2 className="center">{this.props.question}</h2>
                    <form>
                        <input value={this.props.answer} onChange={e => this.props.setAnswer(e.target.value)} type="text" name="answer" required />
                        <button type="submit">submit answer</button>
                    </form>
                </>
                :
                <div>
                    <TitleMessage title={message} />
                    <LoadingIndicator />
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        question: state.game.currentQuestion,
        gameStarted: state.game.gameStarted,
        roundStarted: state.game.roundStarted,
        waitingForQuestionMsg: state.game.waitingForQuestionMsg,
        waitingForStartMsg: state.game.waitingForStartMsg,
        answer: state.game.answer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAnswer: answer => dispatch(setInputFieldAction(answer))
    }
}

const Question = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(QuestionUI);

export default Question;