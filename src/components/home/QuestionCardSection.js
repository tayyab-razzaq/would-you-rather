import React from 'react';
import QuestionCard from './QuestionCard';
import PropTypes from "prop-types";

const QuestionCardSection = ({questions, allUsers}) => {
	return (
		<React.Fragment>
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
		</React.Fragment>
	);
};

QuestionCardSection.propTypes = {
	allUsers: PropTypes.object.isRequired,
	questions: PropTypes.array.isRequired,
};

export default QuestionCardSection;