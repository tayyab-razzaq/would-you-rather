import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

const AnsweredQuestion = ({ question, currentUser }) => {

    const firstOptionsSelected = question.optionOne.votes.length;
    const secondOptionsSelected = question.optionTwo.votes.length;

    const total = firstOptionsSelected + secondOptionsSelected;

    const questionResponses = {
        optionOne: firstOptionsSelected,
        optionTwo: secondOptionsSelected,
    };

    const currentUserAnswer = currentUser.answers[question.id];
    const choices = ['optionOne', 'optionTwo'];

    const questionOptions = choices.map(choice => {
        const answerPercentage = Number((questionResponses[choice] / total * 100).toFixed(2));
        const yourChoice = currentUserAnswer === choice;
        const choiceClasses = ['result-choice'];
        if (yourChoice) {
            choiceClasses.push('selected');
        }

        return (
            <div key={choice} className={choiceClasses.join(' ')}>
                <div className="aqua-green-color header"><strong>{question[choice].text}</strong></div>
                <ProgressBar
                    now={answerPercentage}
                    label={`${answerPercentage}%`}
                    className="custom-progress-bar"
                />
                <div className="col-centered">
                    <strong>{`${questionResponses[choice]} of ${total} votes`}</strong>
                </div>
            </div>
        );
    });

    return (
        <div className="question-summary">
            <div><strong className="header">Would you Rather...</strong></div>
            <div className="question-result">
                {questionOptions}
            </div>
        </div>

    );
};

AnsweredQuestion.propTypes = {
    question: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
};

export default AnsweredQuestion;