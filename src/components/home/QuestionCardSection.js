import React from 'react';
import QuestionCard from './QuestionCard';
import PropTypes from "prop-types";

const QuestionCardSection = ({questions, allUsers}) => {
	return (
		<React.Fragment>
			{
				questions.map(question => {
					return (
						<QuestionCard
							author={allUsers[question.author]}
							question={question}
							key={question.id}/>
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