import React from 'react';
import { Route } from 'react-router-dom';
import { Login } from './components/login';
import { connect } from 'react-redux';

const AuthenticatedComponent = props => {
    if (!props.usersReducer.get('isLoggedIn')) {
        return <Login {...props}/>;
    } else {
        return <Route {...props} />;
    }
};

const mapStateToProps = ({ usersReducer }) => ({ usersReducer });

export default connect(mapStateToProps)(AuthenticatedComponent);