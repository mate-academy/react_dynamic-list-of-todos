import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export class TodoList extends React.PureComponent {
  render() {
    const { todos, selectUser, selectedUserId, query, status } = this.props;

    let filteredTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    if (status === 'Active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (status === 'Finished') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    return (
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={
                `TodoList__item TodoList__item--${todo.completed
                  ? 'checked'
                  : 'unchecked'}`
              }
            >
              <Todo
                todo={todo}
                selectUser={selectUser}
                selectedUserId={selectedUserId}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
  })),
  query: PropTypes.string,
  status: PropTypes.string,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  query: '',
  status: '',
  todos: [],
};
