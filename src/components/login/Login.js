import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getAllUsers, signUp } from '../../actions/usersActions';
import { Grid, Row, Col, Nav, NavItem, TabContent, TabPane, TabContainer } from 'react-bootstrap';
import reactReduxLogo from '../../icons/react-redux.jpg';
import Loader from 'react-loader';
import SignIn from './SignIn';
import SignUp from './SignUp';
import 'react-toastify/dist/ReactToastify.css';
import { testImage } from '../../utils/common';
import { URL } from '../../common/constants';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            selectedUser: null,
            activeKey: 'first',
            newUser: {
                id: '',
                name: '',
                avatarURL: '',
                answers: {},
                questions: [],
            },
        };
    }

    componentDidMount() {
        this.props.getAllUsers().then(() => this.setState({ loaded: true }));
    }

    handleChange = selectedUser => this.setState({ selectedUser });

    onSelect = activeKey => this.setState({ activeKey });

    handleSignIn = () => {
        const { selectedUser } = this.state;
        if (!selectedUser) {
            return;
        }
        this.setState({ loaded: false }, () =>
            this.props.login(selectedUser).then(() => this.redirectToPreviousPage()));
    };

    redirectToPreviousPage = () => {
        let pathName = this.props.history.location.pathname;
        pathName = pathName === '/login' ? '/home' : pathName;
        this.setState({ loaded: true }, () => this.props.history.push(`${URL}/${pathName}`));
    };

    handleNewUserChange = (property, value) => {
        const { newUser } = this.state;
        newUser[property] = value;
        this.setState({ newUser });
    };

    handleSignUp = () => {
        const { newUser } = this.state;
        const allUsers = this.props.usersReducer.get('allUsers');
        if (allUsers.hasOwnProperty(newUser.id)) {
            this.showErrorMessage('Username is already exists');
            return;
        }
        if (!newUser.id || !newUser.name || !newUser.avatarURL) {
            this.showErrorMessage('All fields are not completed');
            return;
        }
        testImage(newUser.avatarURL).then(() => {
            this.setState({ loaded: false });
            this.props.signUp(newUser).then(() => {
                this.redirectToPreviousPage();
            });
        }).catch(() => {
            this.showErrorMessage('Provided url is not valid image');
        });
    };

    showErrorMessage = message => toast.error(message);

    render() {

        const allUsers = this.props.usersReducer.get('allUsers');
        const { loaded, selectedUser, activeKey, newUser } = this.state;
        const signInText = activeKey === 'first' ? 'Sign in' : 'Sign up';
        return (
            <Loader loaded={loaded}>
                <Grid className='sign-in-panel'>
                    <Row className='header'>
                        <Col sm={12}>
                            <div className='col-centered'>
                                <strong>Welcome to Would you Rather App</strong>
                                <br/>
                                {`Please ${signInText} to continue`}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <div className='col-centered'>
                                <img src={reactReduxLogo} alt='react-redux-logo' className='react-redux-logo'/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <TabContainer id="login-tabs" onSelect={this.onSelect} activeKey={activeKey}>
                                <div className='centered'>
                                    <Nav bsStyle="pills">
                                        <NavItem eventKey="first" className='half-tab'>Sign In</NavItem>
                                        <NavItem eventKey="second" className='half-tab'>Sign Up</NavItem>
                                    </Nav>
                                    <TabContent animation>
                                        <TabPane eventKey="first">
                                            <SignIn
                                                allUsers={allUsers} selectedUser={selectedUser}
                                                handleChange={this.handleChange}
                                                handleSignIn={this.handleSignIn}
                                            />
                                        </TabPane>
                                        <TabPane eventKey="second">
                                            <div className='sign-up'>
                                                <SignUp
                                                    allUsers={allUsers} user={newUser}
                                                    handleChange={this.handleNewUserChange}
                                                    handleSignUp={this.handleSignUp}
                                                />
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </TabContainer>
                        </Col>
                    </Row>
                </Grid>
                <ToastContainer/>
            </Loader>
        );
    }
}

const mapStateToProps = ({ usersReducer }) => ({ usersReducer });

const mapDispatchToProps = dispatch => ({
    getAllUsers: () => dispatch(getAllUsers()),
    login: userObj => dispatch(login(userObj)),
    signUp: user => dispatch(signUp(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));