import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { UserDropDown } from '../utils';

const SignIn = props => {
    const { allUsers, selectedUser } = props;
    const options = Object.keys(allUsers).map(key =>
        ({ ...allUsers[key], value: allUsers[key].id, label: allUsers[key].name }));

    return (
        <>
            <Row>
                <Col sm={12}>
                    <div>
                        <UserDropDown
                            value={selectedUser}
                            options={options}
                            onChange={props.handleChange}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <div className="col-centered footer">
                        <Button block className="sign-in-btn" onClick={props.handleSignIn}>Sign In</Button>
                    </div>
                </Col>
            </Row>
        </>
    );
};

SignIn.propTypes = {
    allUsers: PropTypes.object.isRequired,
    selectedUser: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSignIn: PropTypes.func.isRequired,
};

export default SignIn;