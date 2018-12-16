import React, {Component} from 'react';
import './App.css';
import './scss/styles.min.css';
import routes from "./routes";
import {Header} from "./components/header";


export default class WouldYouRatherApp extends Component {
	
	render() {
		return (
			<div className="app">
				<Header history={this.props.history}/>
				<div className='content'>
					{routes}
				</div>
			</div>
		);
	}
}