import React, {Component} from "react"
import {Route} from "react-router-dom"
import {Login} from './components/login';
import {connect} from "react-redux";

class AuthenticatedComponent extends Component {
	render() {
		if (!this.props.usersReducer.get('isLoggedIn')) {
			return <Login {...this.props}/>;
		} else {
			return <Route {...this.props} />;
		}
	}
}

function mapStateToProps(state) {
	return {
		usersReducer: state.usersReducer,
	};
}

export default connect(mapStateToProps)(AuthenticatedComponent);