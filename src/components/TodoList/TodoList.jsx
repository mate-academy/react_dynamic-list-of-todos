import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { TodosSearchInputs } from '../TodosSearchInputs';
import { List } from '../List'
import { TodoType } from '../Types';

export class TodoList extends React.Component {
  state = {
    inputValue: '',
    selectValue: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, getUserId, selectedUserId } = this.props;
    const { inputValue, selectValue } = this.state;
    const filtredTodos = todos
      .filter(todo => todo.title.includes(inputValue))
      .filter((todo) => {
        if (selectValue === 'Active') {
          return !todo.completed;
        }

        if (selectValue === 'Completed') {
          return todo.completed;
        }

        return todo;
      });

    return (
      <div className="TodoList">
        <h2>
          Todos:
          {filtredTodos.length}
        </h2>

        <TodosSearchInputs
          inputValue={inputValue}
          selectValue={selectValue}
          handleChange={this.handleChange}
        />

        <div className="TodoList__list-container">
          {filtredTodos.length
            ? (
              <List
                filtredTodos={filtredTodos}
                getUserId={getUserId}
                selectedUserId={selectedUserId}
              />
            ) : (
              <h3>No todos</h3>
            )
          }
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(TodoType).isRequired,
  ).isRequired,
  getUserId: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
