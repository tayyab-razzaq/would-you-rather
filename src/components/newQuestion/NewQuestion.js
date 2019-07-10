import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { getAllUpdatedQuestions, submitNewQuestion, getAllUpdatedUsers } from '../../actions';
import QuestionOption from './QuestionOption';
import { URL } from '../../common';


class NewQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: {
                optionOneText: '',
                optionTwoText: '',
            },
        };
    }

    onChange = (e, property) => {
        const { question } = this.state;
        question[property] = e.target.value;
        this.setState({ question });
    };

    onSubmitQuestion = () => {
        const author = this.props.usersReducer.get('user');
        const { question } = this.state;
        question.author = author.id;
        this.props.submitNewQuestion(question).then(() => {
            this.props.getAllUpdatedQuestions();
            this.props.getAllUpdatedUsers();
            this.props.history.push(`${URL}/home`);
        });
    };


    render() {

        const { question } = this.state;

        return (
            <Grid>
                <div className="question-card centered new-question">
                    <Row>
                        <Col sm={12} className="text-centered">
                            <strong className="font-26">Create New Question</strong>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col sm={12}>Complete the question</Col>
                    </Row>
                    <Row>
                        <Col sm={12}><strong className="font-18">Would You Rather ...</strong></Col>
                    </Row>
                    <QuestionOption
                        text="Enter Option One text here"
                        value={question.optionOneText}
                        onChange={e => this.onChange(e, 'optionOneText')}
                    />
                    <Row>
                        <Col sm={12}>
                            <div className="option-separator">
                                <span className="text">
									OR
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <QuestionOption
                        text="Enter Option Two text here"
                        value={question.optionTwoText}
                        onChange={e => this.onChange(e, 'optionTwoText')}
                    />
                    <hr/>
                    <Row>
                        <Col sm={12}>
                            <div className="centered footer">
                                <Button block className="submit-btn" onClick={this.onSubmitQuestion}>Submit</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Grid>
        );
    }
}

const mapStateToProps = ({ usersReducer }) => ({ usersReducer });

const mapDispatchToProps = dispatch => ({
    submitNewQuestion: question => dispatch(submitNewQuestion(question)),
    getAllUpdatedUsers: () => dispatch(getAllUpdatedUsers()),
    getAllUpdatedQuestions: () => dispatch(getAllUpdatedQuestions()),
});

NewQuestion.propTypes = {
    history: PropTypes.object.isRequired,
    usersReducer: PropTypes.object.isRequired,
    submitNewQuestion: PropTypes.func.isRequired,
    getAllUpdatedUsers: PropTypes.func.isRequired,
    getAllUpdatedQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);