import React from 'react';
import {Link} from "react-router-dom";

export default () => {
	return (
		<div id="notfound">
			<div className="notfound">
				<div className="notfound-404">
					<h1>Oops!</h1>
					<h2>404 - The Page can't be found</h2>
				</div>
				<Link to={`/home`}>GO TO HOMEPAGE</Link>
			</div>
		</div>
	)
};
