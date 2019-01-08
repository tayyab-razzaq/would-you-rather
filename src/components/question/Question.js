import React, {Component} from 'react';
import UnansweredQuestion from './UnansweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';
import Grid from "react-bootstrap/es/Grid";
import {
	getAllQuestions,
	getQuestionById,
	submitQuestionAnswer,
	getAllUpdatedQuestions
} from '../../actions/questionsActions';
import {getAllUpdatedUsers} from '../../actions/usersActions';
import {connect} from "react-redux";
import Loader from 'react-loader';


class Question extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			loaded: false
		};
	}
	
	componentDidMount() {
		const {questionId} = this.props.match.params;
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
				this.props.history.push('/page-404');
				return;
			}
			this.setState({loaded: true});
		});
	};
	
	onAnswerSubmit = option => {
		const currentUser = this.props.usersReducer.get('user');
		const question = this.props.questionsReducer.get('question');
		this.setState({loaded: false});
		this.props.submitQuestionAnswer(currentUser.id, question.id, option).then(() => {
			const updateQuestions = this.props.getAllUpdatedQuestions();
			const updateUsers = this.props.getAllUpdatedUsers();
			
			Promise.all([updateQuestions, updateUsers]).then(() => {
				this.setState(() => ({loaded: true}));
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
						<div className='question-card centered question-table'>
							<table className='table table-bordered table-responsive table-stripped'>
								<thead>
								<tr>
									<th colSpan={2} className='author'>{`${author.name} asks:`}</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td className='width-25 vertical-middle'>
										<img src={author.avatarURL} className='img-tag' alt='user_img'/>
									</td>
									<td className='width-75'>
										{question.id !== -1 ?
											isAnsweredQuestion ?
												<AnsweredQuestion currentUser={currentUser} question={question}/> :
												<UnansweredQuestion question={question} onSubmit={this.onAnswerSubmit}/>
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

function mapStateToProps(state) {
	return {
		questionsReducer: state.questionsReducer,
		usersReducer: state.usersReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllQuestions() {
			return dispatch(getAllQuestions());
		},
		getAllUpdatedUsers() {
			return dispatch(getAllUpdatedUsers());
		},
		getAllUpdatedQuestions() {
			return dispatch(getAllUpdatedQuestions());
		},
		getQuestionById(questionId) {
			return dispatch(getQuestionById(questionId));
		},
		submitQuestionAnswer(authedUser, qid, answer) {
			return dispatch(submitQuestionAnswer(authedUser, qid, answer));
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Question);