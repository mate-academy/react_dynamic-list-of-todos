import React from 'react';
import './TodoList.scss';

export class TodoList extends React.Component {
  state ={
    todoList: this.props.todos,
    inputValue: '',
  }


  handleSelect = (ev) => {
    const value = ev.target.value;
    const todos = this.props.todos;

    if(value === 'Active') {
      this.setState({
        todoList : todos.filter(todo => todo.completed === false),
      })
    } else if (value === 'Completed') {
      this.setState({
        todoList : todos.filter(todo => todo.completed === true),
      })
    } else {
      this.setState({
        todoList: this.props.todos,
      })
    }
  }

  handleInput = (ev) => {
    const value = ev.target.value;
    this.setState({
      inputValue : value
    },
    this.setState(prev => ({
      todoList: prev.todoList.filter(todo =>todo.title !== null
        &&  todo.title.includes(this.state.inputValue))
    })))
  }

  render() {
    const { todoList } = this.state;
    const { selectUser, changeStatus } = this.props;

    return(
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInput}

        />
        <select onChange={this.handleSelect}>
          <option>All</option>
          <option>Active</option>
          <option>Completed</option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todoList.map(todo => (
              <li
              className={todo.completed
                ? "TodoList__item TodoList__item--checked"
                : "TodoList__item TodoList__item--unchecked"}
              key={todo.id}
              >
              <label>
                <input
                type="checkbox"
                readOnly
                checked={todo.completed}
                onClick={() => changeStatus(todo.id)}
                />
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
                  selectUser(todo.userId);
                }}
              >
                User{todo.userId}
              </button>
            </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
};
