import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const QuestionOption = props => (
    <Row>
        <Col sm={12}>
            <input
                className="form-control"
                placeholder={props.text}
                value={props.value}
                onChange={props.onChange}
            />
        </Col>
    </Row>
);

QuestionOption.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default QuestionOption;