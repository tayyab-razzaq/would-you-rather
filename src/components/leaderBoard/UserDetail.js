import React from 'react';
import PropTypes from "prop-types";

const UserDetail = ({user}) => {
	const questions = user.questions.length;
	const answers = Object.keys(user.answers).length;
	return (
		<div className='question-card centered question-table leaderboard'>
			<table className='table table-bordered table-responsive table-stripped'>
				<tbody>
				<tr>
					<td className='width-25 vertical-align'>
						<div className='user-holder col-centered'>
							<img src={user.avatarURL} alt='user_img'/>
						</div>
					</td>
					<td className='width-50 vertical-align user-detail'>
						<div className='username'>
							<strong>{user.name}</strong>
						</div>
						<div className='score-detail'>
							<div className='row'>
								<div className='col-sm-9'>Answered questions</div>
								<div className='col-sm-3'>{answers}</div>
							</div>
							<hr/>
							<div className='row'>
								<div className='col-sm-9'>Created questions</div>
								<div className='col-sm-3'>{questions}</div>
							</div>
						</div>
					</td>
					<td className='width-25 vertical-align'>
						<table className='table table-bordered table-responsive table-stripped'>
							<thead>
							<tr>
								<th className='col-centered light-grey-back'><strong>Score</strong></th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>
									<div className='col-centered score-holder'>{questions + answers}</div>
								</td>
							</tr>
							</tbody>
						</table>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	)
};

UserDetail.propTypes = {
	user: PropTypes.object.isRequired,
};

export default UserDetail;