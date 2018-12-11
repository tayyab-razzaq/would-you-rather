import React, {Component} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class DropDown extends Component {
	
	formatOption = (option) => {
		return (
			<div className={'image-option'}>
				<div className='image-block'>
					<img src={option.avatarURL} alt='user'/>
				</div>
				<div className='label-span'>
					{option['label']}
				</div>
			</div>
		);
	};
	
	render() {
		return (
			<Select
				options={this.props.options}
				value={this.props.value}
				onChange={this.props.onChange}
				formatOptionLabel={this.formatOption}
			/>
		);
	}
}

DropDown.propTypes = {
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.object,
};

export default DropDown;
