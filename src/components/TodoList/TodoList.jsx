import React, { Component } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { Todo } from '../Todo';
import { TodoListsShape } from '../../types';
import { TodoForm } from '../TodoForm';

export class TodoList extends Component {
  state = {
    filteredTodos: null,
    currentStatus: 'all',
  };

  onTitleFiltering = (value) => {
    this.setState({
      filteredTodos: this.makeTitleFilter(value),
    });
  };

  onStatusFiltering = (value) => {
    this.setState({
      currentStatus: value,
    });
  };

  onRandomize = () => {
    this.setState({
      filteredTodos: this.makeRandomSort(),
    });
  }

  makeRandomSort = () => {
    const { todos } = this.props;
    const { filteredTodos } = this.state;
    const randomizer = () => Math.floor(Math.random() * 3);

    return [...(filteredTodos || todos)].sort(() => (
      randomizer() === 2 ? -1 : randomizer()
    ));
  }

  makeTitleFilter = (query) => {
    const { todos } = this.props;

    return todos.filter((todo) => {
      const { title } = todo;

      try {
        const regex = new RegExp(query, 'gi');

        return regex.test(title);
      } catch (error) {
        return false;
      }
    });
  }

  makeStatusFilter = (query) => {
    const { todos } = this.props;
    const { filteredTodos } = this.state;

    return (filteredTodos || todos).filter((todo) => {
      if (query === 'completed') {
        return todo.completed === true;
      }

      if (query === 'active') {
        return todo.completed === false;
      }

      return true;
    });
  }

  render() {
    const {
      selectedUserId,
      onUserSelect,
    } = this.props;

    const {
      currentStatus,
    } = this.state;
    const preparedTodos = this.makeStatusFilter(currentStatus);

    return (
      <div className="TodoList">
        <h2>{`Todos: ${preparedTodos.length}`}</h2>
        <div className="TodoList__list-container">
          <TodoForm
            onTitleFiltering={this.onTitleFiltering}
            onStatusFiltering={this.onStatusFiltering}
            onRandomize={this.onRandomize}
          />
          <ul className="TodoList__list">
            {preparedTodos.map((todo) => {
              const todoItemClass = classNames({
                TodoList__item: true,
                'TodoList__item--checked': todo.completed === true,
                'TodoList__item--unchecked': todo.completed === false,
              });

              return todo.userId && (
                <li key={todo.id} className={todoItemClass}>
                  <Todo
                    userId={todo.userId}
                    title={todo.title}
                    isCompleted={todo.completed}
                    selectedUserId={selectedUserId}
                    onUserSelect={onUserSelect}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = TodoListsShape;
