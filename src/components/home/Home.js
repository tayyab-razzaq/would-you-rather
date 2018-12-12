import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Button} from 'react-bootstrap';
import {getAllQuestions} from './homeActions';


class Home extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			firstScreen: true
		}
	}
	
	componentDidMount() {
		this.props.getAllQuestions();
	}
	
	onScreenToggle = (screen) => {
		if (this.state.firstScreen !== screen) {
			this.setState({firstScreen: screen});
		}
	};
	
	
	render() {
		
		const {firstScreen} = this.state;
		
		let loggedInUser = {
			id: 'sarahedo',
			name: 'Sarah Edo',
			avatarURL: 'https://image.flaticon.com/icons/svg/138/138680.svg',
			answers: {
				"8xf0y6ziyjabvozdd253nd": 'optionOne',
				"6ni6ok3ym7mf1p33lnez": 'optionTwo',
				"am8ehyc8byjqgar0jgpub9": 'optionTwo',
				"loxhs1bqm25b708cmbf3g": 'optionTwo'
			},
			questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
		};
		
		const answers = Object.keys(loggedInUser['answers']).map(key => key);
		let questions = this.props.homeReducer.get('questions');
		questions = Object.keys(questions).map(key => questions[key]);
		const answeredQuestions = questions.filter(key => answers.includes(key));
		const unansweredQuestions = questions.filter(key => !answers.includes(key));
		
		return (
			<Grid>
				<div className='home centered'>
					<div className='header'>
						<div className='no-padding col-sm-6 right-border'>
							<Button block onClick={() => this.onScreenToggle(true)}>Unanswered Questions</Button>
						</div>
						<div className='col-sm-6 no-padding'>
							<Button block onClick={() => this.onScreenToggle(false)}>Answered Questions</Button>
						</div>
					</div>
					<div className='data'>
						{firstScreen ?
							<div>
								Unanswered Questions
								{JSON.stringify(unansweredQuestions)}
							</div> :
							<div>
								Answered Questions
								{JSON.stringify(answeredQuestions)}
							</div>
						}
					</div>
				</div>
			</Grid>
		
		);
	}
}

function mapStateToProps(state) {
	return {
		homeReducer: state.homeReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch: dispatch,
		getAllQuestions: function () {
			return dispatch(getAllQuestions());
		}
		
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);