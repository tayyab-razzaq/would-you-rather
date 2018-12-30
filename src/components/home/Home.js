import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Nav, NavItem, TabContainer, TabPane, TabContent} from 'react-bootstrap';
import {getAllQuestions} from '../../actions/questionsActions';
import QuestionCardSection from "./QuestionCardSection";
import Loader from 'react-loader';


class Home extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			loaded: false
		};
	}
	
	componentDidMount() {
		const questions = this.props.questionsReducer.get('questions');
		if (Object.keys(questions).length === 0 && questions.constructor === Object) {
			this.props.getAllQuestions().then(() => {
				this.dataLoadedSuccessfully();
			});
		}
		else {
			this.dataLoadedSuccessfully();
		}
	}
	
	dataLoadedSuccessfully = () => {
		this.setState({loaded: true});
	};
	
	
	render() {
		const loggedInUser = this.props.usersReducer.get('user');
		const allUsers = this.props.usersReducer.get('allUsers');
		const answers = Object.keys(loggedInUser.answers).map(key => key);
		let questions = this.props.questionsReducer.get('questions');
		questions = Object.keys(questions).map(key => questions[key]);
		questions = questions.sort((a, b) => {return b.timestamp - a.timestamp});
		const answeredQuestions = questions.filter(question => answers.includes(question.id));
		const unansweredQuestions = questions.filter(question => !answers.includes(question.id));
		
		return (
			<Loader loaded={this.state.loaded}>
				<Grid>
					<TabContainer id="questions-tabs" defaultActiveKey="first">
						<div className='home centered'>
							<Nav bsStyle="pills">
								<NavItem eventKey="first" className='half-tab'>Unanswered Questions</NavItem>
								<NavItem eventKey="second" className='half-tab'>Answered Questions</NavItem>
							</Nav>
							<TabContent animation>
								<TabPane eventKey="first">
									<QuestionCardSection allUsers={allUsers} questions={unansweredQuestions}/>
								</TabPane>
								<TabPane eventKey="second">
									<QuestionCardSection allUsers={allUsers} questions={answeredQuestions}/>
								</TabPane>
							</TabContent>
						</div>
					</TabContainer>
				</Grid>
			</Loader>
		);
	}
}

function mapStateToProps(state) {
	return {
		questionsReducer: state.questionsReducer,
		usersReducer: state.usersReducer,
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