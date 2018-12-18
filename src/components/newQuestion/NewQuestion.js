import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAllQuestions, } from "../../actions/questionsActions";


class NewQuestion extends Component {
	render() {
		return (
			<div>
				Hello
			</div>
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


export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);