import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export class TodoList extends React.Component {
  state = {
    selectedTodoId: 0,
  }

  handleChange = (event, todoId) => {
    const { selectUser } = this.props;

    this.setState({
      selectedTodoId: todoId,
    });

    selectUser(event);
  }

  render() {
    const { todos } = this.props;
    const { selectedTodoId } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(({ id, completed, title, userId }) => (
              <Todo
                key={id}
                completed={completed}
                title={title}
                userId={userId}
                id={id}
                selectedTodoId={selectedTodoId}
                handleChange={this.handleChange}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
};
