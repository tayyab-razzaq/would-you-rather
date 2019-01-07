import React from 'react';
import {Button, Col, Row} from "react-bootstrap";

const SignUp = props => {
	
	return (
		<React.Fragment>
			<Row>
				<Col sm={2}>
					<label>Username: </label>
				</Col>
				<Col sm={10}>
					<input
						className='form-control'
						placeholder='Enter your username'
						value={props.user.id}
						onChange={e => {
							props.handleChange('id', e.target.value)
						}}
					/>
				</Col>
			</Row>
			<Row>
				<Col sm={2}>
					<label>Name: </label>
				</Col>
				<Col sm={10}>
					<input
						className='form-control'
						placeholder='Enter your complete name'
						value={props.user.name}
						onChange={e => {
							props.handleChange('name', e.target.value)
						}}
					/>
				</Col>
			</Row>
			<Row>
				<Col sm={2}>
					<label>Image Url: </label>
				</Col>
				<Col sm={10}>
					<input
						className='form-control'
						placeholder='Enter your image url'
						value={props.user.avatarURL}
						onChange={e => {
							props.handleChange('avatarURL', e.target.value)
						}}
					/>
				</Col>
			</Row>
			<Row>
				<Col sm={12}>
					<div className='col-centered footer'>
						<Button block className='sign-in-btn' onClick={props.handleSignUp}>Sign Up</Button>
					</div>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default SignUp;