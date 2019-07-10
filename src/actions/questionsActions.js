import {
    GET_ALL_QUESTIONS,
    GET_ALL_UPDATED_QUESTIONS,
    GET_QUESTION_BY_ID,
    SUBMIT_QUESTION_ANSWER_SUCCESSFULLY,
    SUBMIT_QUESTION_SUCCESSFULLY,
} from '../common/actionTypes';
import * as API from '../utils/_DATA';

const questionsFetchedSuccessfully = response => ({ response, type: GET_ALL_QUESTIONS });

// eslint-disable-next-line no-underscore-dangle
export const getAllQuestions = () => dispatch => API._getQuestions().then(
    response => dispatch(questionsFetchedSuccessfully(response)));


const updatedQuestionsFetchedSuccessfully = response => ({ response, type: GET_ALL_UPDATED_QUESTIONS });

// eslint-disable-next-line no-underscore-dangle
export const getAllUpdatedQuestions = () => dispatch => API._getQuestions().then(
    response => dispatch(updatedQuestionsFetchedSuccessfully(response)));


const fetchQuestionByIdSuccessfully = (questionId, response) => ({ response, questionId, type: GET_QUESTION_BY_ID });

export const getQuestionById = questionId => dispatch => new Promise(res => {
    dispatch(fetchQuestionByIdSuccessfully(questionId, {}));
    res();
});


const submitQuestionAnswerSuccessfully = response => ({ response, type: SUBMIT_QUESTION_ANSWER_SUCCESSFULLY });

export const submitQuestionAnswer = (authedUser, qid, answer) => dispatch =>
    // eslint-disable-next-line no-underscore-dangle
    API._saveQuestionAnswer({ authedUser, qid, answer }).then(
        () => dispatch(submitQuestionAnswerSuccessfully({ authedUser, qid, answer })));


const submitNewQuestionSuccessfully = response => ({ response, type: SUBMIT_QUESTION_SUCCESSFULLY });

// eslint-disable-next-line no-underscore-dangle
export const submitNewQuestion = question => dispatch => API._saveQuestion(question).then(
    formattedQuestion => dispatch(submitNewQuestionSuccessfully(formattedQuestion)));