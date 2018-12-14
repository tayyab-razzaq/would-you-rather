import React, {Component} from 'react';
import PropTypes from "prop-types";
import {ProgressBar} from 'react-bootstrap';

class AnsweredQuestion extends Component {
	
	render() {
		
		const {question, currentUser} = this.props;
		
		const firstOptionsSelected = question['optionOne'].votes.length;
		const secondOptionsSelected = question['optionTwo'].votes.length;
		
		const total = firstOptionsSelected + secondOptionsSelected;
		
		const questionResponses = {
			'optionOne': firstOptionsSelected,
			'optionTwo': secondOptionsSelected,
		};
		
		let currentUserAnswer = currentUser['answers'][question.id];
		
		const choices = ['optionOne', 'optionTwo'];
		
		const questionOptions = choices.map((choice, choiceIndex) => {
			const answerPercentage = questionResponses[choice]/total*100;
			const yourChoice = currentUserAnswer === choice;
			let choiceClasses = ['result-choice'];
			if (yourChoice) {
				choiceClasses.push('selected');
			}
			
			return (
				<div key={choiceIndex} className={choiceClasses.join(' ')}>
					<div className='aqua-green-color header'><strong>{question[choice].text}</strong></div>
					<ProgressBar
						now={answerPercentage}
						label={`${answerPercentage}%`}
						className='custom-progress-bar'
					/>
					<div className='col-centered'>
						<strong>{`${questionResponses[choice]} of ${total} votes`}</strong>
					</div>
				</div>
			);
		});
		
		return (
			<div className='question-summary'>
				<div><strong className='header'>Would you Rather...</strong></div>
				<div className='question-result'>
					{questionOptions}
				</div>
			</div>
		
		);
	}
}

AnsweredQuestion.propTypes = {
	question: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
};

export default AnsweredQuestion;