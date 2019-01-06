import React, {Component} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class UserDropDown extends Component {
	
	formatOption = (option) => {
		return (
			<div className={'image-option'}>
				<div className='image-block'>
					<img src={option.avatarURL} className='img-tag' alt='user'/>
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

UserDropDown.propTypes = {
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.object,
};

export default UserDropDown;
