import React, {Component} from 'react';
import {connect} from "react-redux";
import Grid from "react-bootstrap/es/Grid";

class LeaderBoard extends Component {
	
	render() {
		const users = this.props.usersReducer.get('allUsers');
		
		const sortedUsers = Object.keys(users).sort((a, b) => {
			const firstUserScore = users[a].questions.length + Object.keys(users[a].answers).length;
			const secondUserScore = users[b].questions.length + Object.keys(users[b].answers).length;
			return secondUserScore - firstUserScore;
		});
		
		const usersDetail = sortedUsers.map((userId) => {
			const user = users[userId];
			const questions = user.questions.length;
			const answers = Object.keys(user.answers).length;
			return (
				<div className='question-card centered question-table leaderboard' key={userId}>
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
		});
		
		return (
			<Grid>
				{usersDetail}
			</Grid>
		);
	}
}

function mapStateToProps(state) {
	return {
		usersReducer: state.usersReducer,
	};
}

export default connect(mapStateToProps)(LeaderBoard);