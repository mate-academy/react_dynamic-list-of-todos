import React from 'react';
import classnames from 'classnames';
import './TodoList.scss';
import { Todo, User } from '../../Types';

type Props = {
  todos: Todo[],
  users: User[],
  selectedUserId: (userId: number) => void,
};

interface State {
  inputTodoTitle: string,
  selectTodoStatus: string,
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    inputTodoTitle: '',
    selectTodoStatus: 'All',
  };

  inputTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({ inputTodoTitle: event.target.value });
  };

  selectTodoStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    this.setState({ selectTodoStatus: event.target.value });
  };

  findUser = (userIdFromTodo: number) => (
    this.props.users.find(user => user.id === userIdFromTodo)
      ? this.props.users.find(user => user.id === userIdFromTodo)?.name
      : 'No user'
  );

  render() {
    const { todos, users } = this.props;
    const { inputTodoTitle, selectTodoStatus } = this.state;

    const preparedTodos: Todo[] = todos
      .filter(todo => (todo.title.toLowerCase()).includes(inputTodoTitle.toLowerCase()))
      .filter(todo => {
        if (selectTodoStatus === 'All') {
          return todo;
        }

        if (selectTodoStatus === 'Active') {
          return !todo.completed;
        }

        return todo.completed;
      });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form action="">
          <input
            onChange={this.inputTodoTitle}
            value={inputTodoTitle}
            placeholder="Pleas, enter a title"
            id="inputTodoTitle"
            type="text"
          />
          <select
            onChange={this.selectTodoStatus}
            value={selectTodoStatus}
            name="selectTodoStatus"
            id="selectTodoStatus"
          >
            <option value="All" selected>All todos</option>
            <option value="Active" selected>Active</option>
            <option value="Completed" selected>Completed</option>
          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {
              preparedTodos
                .map(todo => (
                  <>
                    <li
                      key={todo.id}
                      className={
                        classnames(
                          'TodoList__item',
                          { 'TodoList__item--checked': todo.completed },
                          { 'TodoList__item--unchecked': !todo.completed },
                        )
                      }
                    >
                      <label htmlFor="todoDone">
                        {
                          todo.completed
                            ? <input id="todoDone" type="checkbox" checked readOnly />
                            : <input id="todoToPerform" type="checkbox" readOnly />
                        }
                        <p>{todo.title}</p>
                      </label>

                      <button
                        onClick={() => (this.props.selectedUserId(todo.userId))}
                        className={
                          classnames(
                            'TodoList__user-button button',
                            { 'TodoList__user-button--selected': todo.completed },
                          )
                        }
                        type="button"
                      >
                        {
                          users.find(user => user.id === todo.userId)
                            ? users.find(user => user.id === todo.userId)?.name
                            : 'No user'
                        }
                      </button>
                    </li>
                  </>
                ))
            }
          </ul>
        </div>
      </div>
    );
  }
}
