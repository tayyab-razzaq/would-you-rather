import React from 'react';
import './App.css';
import './scss/styles.min.css';
import routes from './routes';
import { Header } from './components/header';
import PropTypes from 'prop-types';


const App = props => (
    <div className="app">
        <Header history={props.history} pathname={props.history.location.pathname}/>
        <div className="content">
            {routes}
        </div>
    </div>
);

App.propTypes = {
    history: PropTypes.object.isRequired
};

export default App;