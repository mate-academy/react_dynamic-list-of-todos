import React from 'react';
import './TodoList.scss';
import ClassName from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    searchQuery: '',
    requiredStatus: 'all',
    preparedTodos: this.props.todos,
    // i want to update it every time when TodoList or his parent updates
    // BUT! I dont want infinite loop
    // AND! I dont know what the condition to write in didMountUpdate
  }

  filtrator = (status, searchQuery) => {
    let filteredTodos = [...this.props.todos];

    filteredTodos = filteredTodos.filter(
      todo => todo.title && todo.title.includes(searchQuery),
    );

    switch (status) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default: (() => 'I love linter')();

        break;
    }

    this.setState({
      preparedTodos: filteredTodos,
    });
  }

  inputHandler = (event) => {
    // this.setState(() => ({
    //   searchQuery: event.target.value
    // }))
    // why it dont work???

    this.setState({
      searchQuery: event.target.value,
    });

    this.filtrator(this.state.requiredStatus, event.target.value);
  }

  selectHandler = (event) => {
    this.setState({
      requiredStatus: event.target.value,
    });

    this.filtrator(event.target.value, this.state.searchQuery);
  }

  render() {
    const { changeSelectedUser } = this.props;
    const todos = this.state.preparedTodos;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <div>
            <input
              type="text"
              placeholder="enter query"
              value={this.state.searchQuery}
              onChange={this.inputHandler}
            />
            <select
              value={this.state.requiredStatus}
              onChange={this.selectHandler}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={ClassName({
                  TodoList__item: true,
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => {
                    changeSelectedUser(todo.userId);
                  }}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  changeSelectedUser: PropTypes.func.isRequired,
};
