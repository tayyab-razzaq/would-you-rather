import React from 'react';
import { Link } from 'react-router-dom';

import { URL } from '../common/constants';

export default () => (
    <div id="notfound">
        <div className="notfound">
            <div className="notfound-404">
                <h1>Oops!</h1>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h2>404 - The Page can't be found</h2>
            </div>
            <Link to={`${URL}/home`}>GO TO HOMEPAGE</Link>
        </div>
    </div>
);
