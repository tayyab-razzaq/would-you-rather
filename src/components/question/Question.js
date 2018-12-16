import React, {Component} from 'react';
import UnansweredQuestion from './UnansweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';
// import {USERS} from "../../common/constants";
import Grid from "react-bootstrap/es/Grid";
import {getQuestionById, submitQuestionAnswer} from '../../actions/questionsActions';
import connect from "react-redux/es/connect/connect";


class Question extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			currentUser: {
				id: 'tylermcginnis',
				name: 'Tyler McGinnis',
				avatarURL: 'https://image.flaticon.com/icons/svg/138/138682.svg',
				answers: {
					"vthrdm985a262al8qx3do": 'optionOne',
					"xj352vofupe1dqz9emx13r": 'optionTwo',
				},
				questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
			}
		};
	}
	
	componentDidMount() {
		const questionId = this.props.match.params['questionId'];
		this.props.getQuestionById(questionId);
	}
	
	onAnswerSubmit = (option) => {
		// const { currentUser } = this.state;
		const currentUser = this.props.usersReducer.get('user');
		const question = this.props.questionsReducer.get('question');
		this.props.submitQuestionAnswer(currentUser.id, question.id, option).then(() => {
			const currentUser = this.props.usersReducer.get('user');
			this.setState({currentUser});
		});
	};
	
	render() {
		const question = this.props.questionsReducer.get('question');
		if (question) {
			// const { currentUser } = this.state;
			// const author = USERS[question.author];
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
		getQuestionById: function (questionId) {
			return dispatch(getQuestionById(questionId));
		},
		submitQuestionAnswer: function (authedUser, qid, answer) {
			return dispatch(submitQuestionAnswer(authedUser, qid, answer));
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Question);