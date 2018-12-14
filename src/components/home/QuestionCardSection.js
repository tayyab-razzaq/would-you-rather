import React, {Component, Fragment} from 'react';
import QuestionCard from './QuestionCard';
import PropTypes from "prop-types";

class QuestionCardSection extends Component {
	render() {
		const {questions, allUsers} = this.props;
		return (
			<Fragment>
				{
					questions.map((question, questionIndex) => {
						return (
							<QuestionCard
								author={allUsers[question.author]}
								question={question}
								key={questionIndex}/>
						);
					})
				}
			</Fragment>
		);
	}
}

QuestionCardSection.propTypes = {
	allUsers: PropTypes.object.isRequired,
	questions: PropTypes.array.isRequired,
};

export default QuestionCardSection;