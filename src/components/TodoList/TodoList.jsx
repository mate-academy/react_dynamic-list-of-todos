import React from 'react';
import './TodoList.scss';
import { Todo } from '../Todo';
import { TodoListShape } from './TodoListShape';

export class TodoList extends React.PureComponent {
  state = {
    searchValue: '',
    showedTodos: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, selectUserId, selectedUserId } = this.props;
    const { searchValue, showedTodos } = this.state;
    let preparedTodos = todos.filter(
      todo => todo.title.toLowerCase().includes(searchValue),
    );

    if (showedTodos === 'completed') {
      preparedTodos = preparedTodos.filter(todo => todo.completed);
    }

    if (showedTodos === 'active') {
      preparedTodos = preparedTodos.filter(todo => !todo.completed);
    }

    return (
      <div className="TodoList">
        <div className="TodoList__form">
          <label>
            <input
              type="text"
              className="TodoList__input"
              placeholder="write name of title, please"
              name="searchValue"
              value={searchValue}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <select
              name="showedTodos"
              value={showedTodos}
              className="TodoList__select"
              onChange={this.handleChange}
            >
              <option value="">
                All
              </option>
              <option value="completed">
                Completed
              </option>
              <option value="active">
                Active
              </option>
            </select>
          </label>
        </div>
        <h2>Todos:</h2>
        <Todo
          todos={preparedTodos}
          selectUserId={selectUserId}
          selectedUserId={selectedUserId}
        />
      </div>
    );
  }
}

TodoList.propTypes = TodoListShape;
