import React from 'react';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


const QuestionCard = ({question, author}) => {
	return (
		<div className='question-table'>
			<table className='table table-bordered table-responsive table-stripped'>
				<thead>
				<tr>
					<th colSpan={2} className='author'>{`${author.name} asks:`}</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td className='width-25'><img src={author.avatarURL} alt='user_img'/></td>
					<td className='width-75'>
						<div className='question-summary'>
							<div><strong>Would you Rather</strong></div>
							<div>{`...${question.optionOne.text}...`}</div>
							<div>
								<Link to={`/questions/${question.id}`}>
									<Button block>View Poll</Button>
								</Link>
							</div>
						</div>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	);
};

QuestionCard.propTypes = {
	question: PropTypes.object.isRequired,
	author: PropTypes.object.isRequired
};

export default QuestionCard;