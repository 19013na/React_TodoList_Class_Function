import { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
    /*
        true 리턴(todos 내용이 변경됨)하면 렌더링을 다시 하고,
        false 리턴(todos 내용이 변경되지 않음) 하면 렌더링을 생략한다.
    */
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.myTodos !== nextProps.myTodos;
    }

    render() {
        const { myTodos, myToggle, myRemove } = this.props;
        const todoList = myTodos.map(
            ({ id, text, checked }) => (
                <TodoItem
                    id={id}
                    text={text}
                    checked={checked}
                    onToggle={myToggle}
                    onRemove={myRemove}
                    key={id}
                />
            )
        );

        return (
            <div>
                {todoList}
            </div>
        );
    }
}
TodoItemList.propTypes = {
    myTodos: PropTypes.array,
    myToggle: PropTypes.func,
    myRemove: PropTypes.func
};
export default TodoItemList;