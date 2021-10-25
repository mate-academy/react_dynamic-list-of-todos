import React from 'react';
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
    selectTodoStatus: 'all',
  };

  inputTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({ inputTodoTitle: event.target.value.toLowerCase() });
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
            <option value="all" selected>All todos</option>
            {
              todos
                .map(todo => (todo.completed ? 'Done' : 'Performed'))
                .filter((item, index, array) => array.indexOf(item) === index)
                .map(item => (
                  <>
                    <option value={item} key={item}>{item}</option>
                  </>
                ))
            }
          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {
              todos
                .filter(todo => (todo.title.toLowerCase()).includes(inputTodoTitle))
                .filter(todo => {
                  if (selectTodoStatus === 'all') {
                    return todo;
                  }

                  return todo.completed === (selectTodoStatus === 'Done');
                })
                .map(todo => (
                  <>
                    {todo.completed ? (
                      <li
                        key={todo.id}
                        className="TodoList__item TodoList__item--checked"
                      >
                        <label htmlFor="todoDone">
                          <input id="todoDone" type="checkbox" checked readOnly />
                          <p>{todo.title}</p>
                        </label>

                        <button
                          onClick={() => (this.props.selectedUserId(todo.userId))}
                          className="TodoList__user-button button"
                          type="button"
                        >
                          {
                            users.find(user => user.id === todo.userId)
                              ? users.find(user => user.id === todo.userId)?.name
                              : 'No user'
                          }
                        </button>
                      </li>
                    ) : (
                      <li
                        key={todo.id}
                        className="TodoList__item TodoList__item--unchecked"
                      >
                        <label htmlFor="todoToPerform">
                          <input id="todoToPerform" type="checkbox" readOnly />
                          <p>{todo.title}</p>
                        </label>

                        <button
                          onClick={() => (this.props.selectedUserId(todo.userId))}
                          className="
                            TodoList__user-button
                            TodoList__user-button--selected
                            button
                          "
                          type="submit"
                        >
                          {
                            users.find(user => user.id === todo.userId)
                              ? users.find(user => user.id === todo.userId)?.name
                              : 'No user'
                          }
                        </button>
                      </li>
                    )}
                  </>
                ))
            }
          </ul>
        </div>
      </div>
    );
  }
}
