import React, {Component} from 'react';
import './App.css';
import './scss/styles.min.css';
import routes from "./routes";

class WouldYouRatherApp extends Component {
	render() {
		return (
			<div className="app">
				<header>
					Nav Bar
				</header>
				<div className='content'>
					{routes}
				</div>
			</div>
		);
	}
}

export default WouldYouRatherApp;
