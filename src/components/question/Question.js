import React, {Component} from 'react';
import UnansweredQuestion from './UnansweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';
import Grid from "react-bootstrap/es/Grid";
import {getAllQuestions, getQuestionById, submitQuestionAnswer, getAllUpdatedQuestions} from '../../actions/questionsActions';
import {getAllUpdatedUsers} from '../../actions/usersActions';
import {connect} from "react-redux";


class Question extends Component {
	
	componentDidMount() {
		const questionId = this.props.match.params['questionId'];
		const questions = this.props.questionsReducer.get('questions');
		if (Object.keys(questions).length === 0 && questions.constructor === Object) {
			this.props.getAllQuestions().then(() => {
				this.props.getQuestionById(questionId);
			});
		}
		else {
			this.props.getQuestionById(questionId);
		}
	}
	
	onAnswerSubmit = (option) => {
		const currentUser = this.props.usersReducer.get('user');
		const question = this.props.questionsReducer.get('question');
		this.props.submitQuestionAnswer(currentUser.id, question.id, option).then(() => {
			this.props.getAllUpdatedQuestions();
			this.props.getAllUpdatedUsers();
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
				<Grid>
					<div className='question-card centered question-table'>
						<table className='table table-bordered table-responsive table-stripped'>
							<thead>
							<tr>
								<th colSpan={2} className='author'>{`${author.name} asks:`}</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td className='width-25'>
									<div>
										<div>
											<img src={author.avatarURL} alt='user_img'/>
										</div>
									</div>
								</td>
								<td className='width-75'>
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
			);
		} else {
			return <div/>;
		}
	}
}

function mapStateToProps(state) {
	return {
		questionsReducer: state.questionsReducer,
		usersReducer: state.usersReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch: dispatch,
		getAllQuestions: function () {
			return dispatch(getAllQuestions());
		},
		getAllUpdatedUsers: function () {
			return dispatch(getAllUpdatedUsers());
		},
		getAllUpdatedQuestions: function () {
			return dispatch(getAllUpdatedQuestions());
		},
		getQuestionById: function (questionId) {
			return dispatch(getQuestionById(questionId));
		},
		submitQuestionAnswer: function (authedUser, qid, answer) {
			return dispatch(submitQuestionAnswer(authedUser, qid, answer));
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Question);