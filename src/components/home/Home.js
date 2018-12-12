import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import reactReduxLogo from '../../icons/react-redux.jpg';


class Home extends Component {
	
	render() {
		
		return (
			
			<Grid className='sign-in-panel'>
				<Row className='header'>
					<Col sm={12}>
						<div className='col-centered'>
							<strong>Welcome to Would you Rather App</strong>
							<br/>
							Please Sign in to continue
						</div>
					</Col>
				</Row>
				<Row>
					<Col sm={12}>
						<div className='col-centered'>
							<img src={reactReduxLogo} alt='react-redux-logo' className='react-redux-logo'/>
						</div>
					</Col>
				</Row>
			</Grid>
		
		);
	}
}

function mapStateToProps(state) {
	return {
		state: state,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch: dispatch,
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);