import React, {Component} from 'react';
import UnansweredQuestion from './UnansweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';
import {USERS, QUESTIONS} from "../../common/constants";
import Grid from "react-bootstrap/es/Grid";


class Question extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			question: null
		}
	}
	
	componentDidMount() {
		const questionId = this.props.match.params['questionId'];
		const question = QUESTIONS[questionId];
		this.setState({question});
	}
	
	render() {
		const {question} = this.state;
		if (question) {
			const currentUser = {
				id: 'tylermcginnis',
				name: 'Tyler McGinnis',
				avatarURL: 'https://image.flaticon.com/icons/svg/138/138682.svg',
				answers: {
					"vthrdm985a262al8qx3do": 'optionOne',
					"xj352vofupe1dqz9emx13r": 'optionTwo',
				},
				questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
			};
			
			
			const author = USERS[question.author];
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
											<UnansweredQuestion question={question}/>
										: null
									}
								</td>
							</tr>
							</tbody>
						</table>
					</div>
				</Grid>
			);
		}
		else {
			return <div/>;
		}
	}
}

export default Question;