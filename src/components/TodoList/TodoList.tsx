import React from 'react';
import './TodoList.scss';
import { getTodos } from '../../api';

type State = {
  currentTodos: Todo[];
  query: string;
};

type Props = {
  selectUser: (userId: number) => void;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    currentTodos: [],
    query: '',
  };

  componentDidMount() {
    getTodos()
      .then((todos: Todo[]) => {
        this.setState({
          currentTodos: todos,
        });
      });
  }

  render() {
    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <input
            type="text"
            value={this.state.query}
            onChange={(event) => {
              this.setState({
                query: event.target.value,
              });
            }}
          />
          <ul className="TodoList__list">
            {this.state.currentTodos.map(todo => (
              todo.completed
                ? (
                  <li className="TodoList__item TodoList__item--unchecked">
                    <label>
                      <input type="checkbox" readOnly />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className="
                        TodoList__user-button
                        TodoList__user-button--selected
                        button
                      "
                      type="button"
                      onClick={() => this.props.selectUser(todo.userId)}
                    >
                      User&nbsp;
                      {todo.userId}
                    </button>
                  </li>
                )

                : (
                  <li className="TodoList__item TodoList__item--checked">
                    <label>
                      <input type="checkbox" checked readOnly />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className="TodoList__user-button button"
                      type="button"
                      onClick={() => this.props.selectUser(todo.userId)}
                    >
                      User&nbsp;
                      {todo.userId}
                    </button>
                  </li>
                )
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
