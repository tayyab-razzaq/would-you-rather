import React, {Component} from 'react';
import './App.css';
import './scss/styles.min.css';
import routes from "./routes";
import Header from "./components/header/Header";


class WouldYouRatherApp extends Component {
	
	render() {
		return (
			<div className="app">
				<Header/>
				<div className='content'>
					{routes}
				</div>
			</div>
		);
	}
}

export default WouldYouRatherApp;
