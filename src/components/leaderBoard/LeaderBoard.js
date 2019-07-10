import React from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/es/Grid';
import PropTypes from 'prop-types';

import UserDetail from './UserDetail';

const LeaderBoard = props => {
    const users = props.usersReducer.get('allUsers');

    const sortedUsers = Object.keys(users).sort((a, b) => {
        const firstUserScore = users[a].questions.length + Object.keys(users[a].answers).length;
        const secondUserScore = users[b].questions.length + Object.keys(users[b].answers).length;
        return secondUserScore - firstUserScore;
    });

    const usersDetail = sortedUsers.map(userId => {
        const user = users[userId];
        return <UserDetail user={user} key={userId}/>;
    });

    return (
        <Grid>
            {usersDetail}
        </Grid>
    );
};

const mapStateToProps = ({ usersReducer }) => ({ usersReducer });

LeaderBoard.propTypes = {
    usersReducer: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(LeaderBoard);