import React from 'react';
import './App.css';
import './scss/styles.min.css';
import routes from "./routes";
import {Header} from "./components/header";


export default function WouldYouRatherApp (props) {
	return (
		<div className="app">
			<Header history={props.history} pathname={props.history.location.pathname}/>
			<div className='content'>
				{routes}
			</div>
		</div>
	);
}