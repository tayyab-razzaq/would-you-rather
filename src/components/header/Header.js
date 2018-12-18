import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HEADER} from '../../common/constants';
import {reinitializedState} from '../../actions/usersActions';


class Header extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			activeKey: 'home'
		}
	}
	
	componentDidMount() {
		if (this.props.history.location.pathname !== '/login' && !this.props.usersReducer.get('isLoggedIn')) {
			// this.props.history.push('/login');
		}
		// else {
		// 	if (this.props.history.location.pathname !== '') {
		// 		this.setState({activeKey: this.props.history.location.pathname.replace('/', '')});
		// 	}
		// }
	}
	
	onKeySelect = (event, activeKey) => {
		event.preventDefault();
		this.setState({activeKey});
		if ('login' === activeKey) {
			this.props.reinitializedState();
		}
		this.props.history.push(`/${activeKey}`);
	};
	
	render() {
		const isLoggedIn = this.props.usersReducer.get('isLoggedIn');
		const navOptions = Object.keys(HEADER).map((key) => {
			const isActiveKey = isLoggedIn && this.state.activeKey === key;
			let keyClasses = [];
			if (isActiveKey) {
				keyClasses.push('active');
			}
			if (!isLoggedIn) {
				keyClasses.push('disabled')
			}
			return (
				<li className={keyClasses.join(' ')} key={key}>
					<a href={`/${key}`} onClick={(e) => this.onKeySelect(e, key)}>{HEADER[key]}</a>
				</li>
			);
		});
		
		let userDetail = null;
		
		if (isLoggedIn) {
			const user = this.props.usersReducer.get('user');
			userDetail = (
				<ul className="nav navbar-nav navbar-right">
					<li className='custom-nav-item'>Hello, {`${user['name']}`}</li>
					<li><a href={'/login'} onClick={(e) => this.onKeySelect(e, 'login')}>Logout</a></li>
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
		dispatch: dispatch,
		reinitializedState: function() {
			dispatch(reinitializedState());
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);