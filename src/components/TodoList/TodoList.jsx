import React from 'react';
import './TodoList.scss';
import { ControlPanel } from '../ControlPanel'
import { propTypes } from '../../types';


export class TodoList extends React.Component {
  state ={
    select: 'All',
    inputTitle: '',
  }

  handleInputChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  filterByTitle = (todo) => {
    const { inputTitle } = this.state;

    return todo.title.toLowerCase()
      .includes(inputTitle.toLowerCase());
  }

  filterByStatus = (todo) => {
    const { select } = this.state;

    switch (select) {
      case 'Completed': return todo.completed;
      case 'Active': return !todo.completed;
      default: return true;
    }
  }

  render() {

    const {
      todos,
      selectUser,
      changeStatus,
    } = this.props;

    const {
      inputTitle,
      select,
    } = this.state;

    const filterTodos = todos
      .filter(this.filterByTitle)
      .filter(this.filterByStatus);

    return(
      <div className="TodoList">
        <h2>Todos:</h2>
        <ControlPanel
          handleInputChange={this.handleInputChange}
          inputTitle={inputTitle}
          select={select}
        />
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filterTodos.map(todo => (
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

TodoList.propTypes = propTypes;
