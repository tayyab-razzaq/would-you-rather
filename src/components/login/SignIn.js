import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import UserDropDown from '../utils/UserDropDown';

const SignIn = props => {
    const { allUsers, selectedUser } = props;
    const options = Object.keys(allUsers).map(key => {
        return { ...allUsers[key], value: allUsers[key].id, label: allUsers[key].name };
    });

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
                    <div className='col-centered footer'>
                        <Button block className='sign-in-btn' onClick={props.handleSignIn}>Sign In</Button>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default SignIn;