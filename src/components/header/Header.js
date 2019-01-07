import React, {Component} from 'react';
import {logout} from '../../actions/usersActions';
import {connect} from 'react-redux';
import {HEADER} from '../../common/constants';


class Header extends Component {
	
	onKeySelect = (event, activeKey) => {
		event.preventDefault();
		if ('login' === activeKey) {
			this.props.logout();
		}
		this.props.history.push(`/${activeKey}`);
	};
	
	render() {
		const isLoggedIn = this.props.usersReducer.get('isLoggedIn');
		const navOptions = Object.keys(HEADER).map(key => {
			const isActiveKey = isLoggedIn && this.props.pathname === `/${key}`;
			const keyClasses = [];
			if (isActiveKey) {
				keyClasses.push('active');
			}
			if (!isLoggedIn) {
				keyClasses.push('disabled')
			}
			return (
				<li className={keyClasses.join(' ')} key={key}>
					<a href={`/${key}`} onClick={e => this.onKeySelect(e, key)}>{HEADER[key]}</a>
				</li>
			);
		});
		
		let userDetail = null;
		
		if (isLoggedIn) {
			const user = this.props.usersReducer.get('user');
			userDetail = (
				<ul className="nav navbar-nav navbar-right">
					<li className='custom-nav-item'>Hello, {`${user['name']}`}</li>
					<li><a href={'/login'} onClick={e => this.onKeySelect(e, 'login')}>Logout</a></li>
				</ul>
			)
		}
		return (
			<nav className="navbar navbar-default">
				<div className="container">
					<div className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							{navOptions}
						</ul>
						{userDetail}
					</div>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		usersReducer: state.usersReducer,
	};
}


function mapDispatchToProps(dispatch) {
	return {
		logout() {
			return dispatch(logout());
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);