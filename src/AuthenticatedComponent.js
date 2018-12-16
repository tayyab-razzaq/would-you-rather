import React, {Component} from "react"
import {Redirect, Route} from "react-router-dom"
import {connect} from "react-redux";

class AuthenticatedComponent extends Component {
	render() {
		if (!this.props.usersReducer.get('isLoggedIn')) {
			return <Redirect to='/login' otherProps={...this.props}/>;
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