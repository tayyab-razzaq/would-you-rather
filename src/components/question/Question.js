import React, { Component } from 'react';
import Grid from 'react-bootstrap/es/Grid';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import PropTypes from 'prop-types';

import UnansweredQuestion from './UnansweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';
import {
    getAllQuestions,
    getQuestionById,
    submitQuestionAnswer,
    getAllUpdatedQuestions,
    getAllUpdatedUsers
} from '../../actions';
import { URL } from '../../common';


class Question extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
        };
    }

    componentDidMount() {
        const { questionId } = this.props.match.params;
        const questions = this.props.questionsReducer.get('questions');
        if (Object.keys(questions).length === 0 && questions.constructor === Object) {
            this.props.getAllQuestions().then(() => {
                this.getQuestionById(questionId);
            });
        }
        else {
            this.getQuestionById(questionId);
        }
    }

    getQuestionById = questionId => {
        this.props.getQuestionById(questionId).then(() => {
            const question = this.props.questionsReducer.get('question');
            if (!question) {
                this.props.history.push(`${URL}/page-404`);
                return;
            }
            this.setState({ loaded: true });
        });
    };

    onAnswerSubmit = option => {
        const currentUser = this.props.usersReducer.get('user');
        const question = this.props.questionsReducer.get('question');
        this.setState({ loaded: false });
        this.props.submitQuestionAnswer(currentUser.id, question.id, option).then(() => {
            const updateQuestions = this.props.getAllUpdatedQuestions();
            const updateUsers = this.props.getAllUpdatedUsers();

            Promise.all([updateQuestions, updateUsers]).then(() => {
                this.setState(() => ({ loaded: true }));
            });
        });
    };

    render() {
        const question = this.props.questionsReducer.get('question');
        if (question) {
            const currentUser = this.props.usersReducer.get('user');
            const author = this.props.usersReducer.get('allUsers')[question.author];
            const allAnswers = Object.keys(currentUser.answers).map(key => key);
            const isAnsweredQuestion = allAnswers.includes(question.id);

            return (
                <Loader loaded={this.state.loaded}>
                    <Grid>
                        <div className="question-card centered question-table">
                            <table className="table table-bordered table-responsive table-stripped">
                                <thead>
                                    <tr>
                                        <th colSpan={2} className="author">{`${author.name} asks:`}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="width-25 vertical-middle">
                                            <img src={author.avatarURL} className="img-tag" alt="user_img"/>
                                        </td>
                                        <td className="width-75">
                                            {/* eslint-disable-next-line no-nested-ternary */}
                                            {question.id !== -1 ?
                                                isAnsweredQuestion ?
                                                    <AnsweredQuestion currentUser={currentUser} question={question}/> :
                                                    <UnansweredQuestion
                                                        question={question} onSubmit={this.onAnswerSubmit}/>
                                                : null
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Grid>
                </Loader>
            );
        }
        return (
            <Loader loaded={this.state.loaded}>
                <div/>
            </Loader>
        );
    }
}

const mapStateToProps = ({ questionsReducer, usersReducer }) => ({ questionsReducer, usersReducer });

const mapDispatchToProps = dispatch => ({
    getAllQuestions: () => dispatch(getAllQuestions()),
    getAllUpdatedUsers: () => dispatch(getAllUpdatedUsers()),
    getAllUpdatedQuestions: () => dispatch(getAllUpdatedQuestions()),
    getQuestionById: questionId => dispatch(getQuestionById(questionId)),
    submitQuestionAnswer: (authedUser, qid, answer) => dispatch(submitQuestionAnswer(authedUser, qid, answer)),
});

Question.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    questionsReducer: PropTypes.object.isRequired,
    usersReducer: PropTypes.object.isRequired,
    getAllQuestions: PropTypes.func.isRequired,
    getAllUpdatedUsers: PropTypes.func.isRequired,
    getAllUpdatedQuestions: PropTypes.func.isRequired,
    getQuestionById: PropTypes.func.isRequired,
    submitQuestionAnswer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);