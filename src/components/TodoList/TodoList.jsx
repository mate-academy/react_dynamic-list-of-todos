import React from 'react';
import './TodoList.scss';

import { Todo } from '../Todo';
import { ListOptions } from '../ListOptions';
import { TodoListShape } from '../shapes/TodoListShape';

export class TodoList extends React.PureComponent {
  state = {
    selectedTodoId: 0,
    titleQuery: '',
    statusQuery: 'all',
  };

  callbacksByStatus = {
    all: () => true,
    active: todo => !todo.completed,
    completed: todo => todo.completed,
  };

  handleUserSelect = (userId, id) => {
    this.props.selectUser(userId);

    this.setState({
      selectedTodoId: id,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [`${name}Query`]: value,
    });
  };

  filterTodos = (todos) => {
    const { titleQuery, statusQuery } = this.state;
    const filterQuery = titleQuery.toLowerCase();

    return todos.filter(todo => (
      todo.title.toLowerCase().includes(filterQuery)
      && this.callbacksByStatus[statusQuery](todo)));
  };

  render() {
    const { todos } = this.props;
    const { selectedTodoId, titleQuery, statusQuery } = this.state;
    const filteredTodos = this.filterTodos(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <ListOptions
          handleChange={this.handleChange}
          titleQuery={titleQuery}
          statusQuery={statusQuery}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                handleUserSelect={this.handleUserSelect}
                selectedTodoId={selectedTodoId}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = TodoListShape;

TodoList.defaultProps = {
  todos: [],
};
