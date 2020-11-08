import React from 'react';
import './TodoList.scss';
import { Todo } from '../Todo';
import { TodoListShape } from './TodoListShape';
import { Input } from '../Input';
import { Select } from '../Select';

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
      todo => todo.title.toLowerCase().includes(searchValue.toLowerCase()),
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
          <Input value={searchValue} handleChange={this.handleChange} />
          <Select value={showedTodos} handleChange={this.handleChange} />
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
