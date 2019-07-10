import React from 'react';
import PropTypes from 'prop-types';

import QuestionCard from './QuestionCard';

const QuestionCardSection = ({ questions, allUsers }) => (
    <>
        {
            questions.map(question => (
                <QuestionCard
                    author={allUsers[question.author]}
                    question={question}
                    key={question.id}/>
            ))
        }
    </>
);

QuestionCardSection.propTypes = {
    allUsers: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
};

export default QuestionCardSection;