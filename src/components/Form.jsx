import { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.css';

class Form extends Component {
    render() {
        const { myTodo, myEnter, myChange, myCreate } = this.props;
        return (
            <div className="form">
                <input value={myTodo} onChange={myChange}
                    onKeyDown={myEnter} />
                <div className="create-button" onClick={myCreate}>
                    추가
                </div>
            </div>
        );
    }
}
Form.propTypes = {
    myTodo: PropTypes.string,
    myEnter: PropTypes.func,
    myChange: PropTypes.func,
    myCreate: PropTypes.func
};
export default Form;