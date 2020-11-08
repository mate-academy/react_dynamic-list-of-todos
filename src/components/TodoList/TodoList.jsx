import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import { SelectTodosState } from '../SelectTodosState';
import { Todo } from '../Todo';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    title: '',
    todos: this.props.todos,
  }

  searchByTitle = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      todos: this.props.todos.filter(todo => (
        todo.title.toLowerCase().includes(value.toLowerCase())
      )),
    });
  }

  selectTodos = (event) => {
    const { value } = event.target;

    if (value === 'all') {
      this.setState({
        todos: this.props.todos,
        title: '',
      });
    } else if (value === 'completed') {
      this.setState({
        todos: this.props.todos.filter(todo => (
          todo.completed === true
        )),
        title: '',
      });
    } else if (value === 'uncompleted') {
      this.setState({
        todos: this.props.todos.filter(todo => (
          todo.completed === false
        )),
        title: '',
      });
    }
  }

  render() {
    const { todos, title } = this.state;
    const { selectUser } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <Input searchByTitle={this.searchByTitle} title={title} />
          <SelectTodosState selectTodos={this.selectTodos} />
          <ul className="TodoList__list">
            {
              todos.map(todo => (
                <Todo
                  key={todo.id}
                  title={todo.title}
                  userId={todo.userId}
                  completed={todo.completed}
                  selectUser={selectUser}
                />
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
};
