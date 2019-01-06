import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";


class UnansweredQuestion extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			value: 'optionOne'
		};
	}
	
	onChange = (e) => {
		this.setState({value: e.target.value});
	};
	
	render() {
		const {question} = this.props;
		const choices = ['optionOne', 'optionTwo'];
		
		const questionOptions = choices.map(choice => {
			return (
				<div className="radio" key={choice}>
					<label>
						<input
							type="radio"
							value={choice}
							onChange={this.onChange}
							checked={this.state.value === choice}/>
						{question[choice].text}
					</label>
				</div>
			);
		});
		
		return (
			<div className='question-summary'>
				<div><strong className='header'>Would you Rather...</strong></div>
				<div className='radio-group'>
					{questionOptions}
				</div>
				<div>
					<Button  block className='submit-btn' onClick={() => this.props.onSubmit(this.state.value)}>
						Submit
					</Button>
				</div>
			</div>
		
		);
	}
}

UnansweredQuestion.propTypes = {
	question: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default UnansweredQuestion;