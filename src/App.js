import React, {Component} from 'react';
import './App.css';
import routes from "./routes";

class WouldYouRatherApp extends Component {
	render() {
		return (
			<div className="app">
				Hello World
				{routes}
			</div>
		);
	}
}

export default WouldYouRatherApp;
