import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { TodosForm } from '../TodosForm';

export class TodoList extends React.Component {
  state = {
    title: '',
    todos: this.props.todos,
    allTodos: this.props.todos,
    taskStatus: '',
  }

  componentDidUpdate(_, prevState) {
    const { allTodos, title } = this.state;

    if (prevState.title !== this.state.title) {
      this.setState({
        todos: allTodos.filter((todo) => {
          if (!todo.title) {
            return 0;
          }

          return todo.title.toUpperCase().includes(title.toUpperCase());
        }),
      });
    }
  }

  filterTodos = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
    this.setState((prevState) => {
      switch (value) {
        case 'Active(not completed) todos':
          return { todos: prevState.allTodos
            .filter(todo => !todo.completed) };
        case 'Completed todos':
          return { todos: prevState.allTodos
            .filter(todo => todo.completed) };
        case 'All todos':
        default:
          return { todos: prevState.allTodos };
      }
    });
  };

  handleChangeInput = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  };

  render() {
    const { selectUser } = this.props;
    const { todos } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <TodosForm
          title={this.state.title}
          handleChangeInput={this.handleChangeInput}
          taskStatus={this.state.taskStatus}
          filterTodos={this.filterTodos}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed })}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                {selectUser === todo.userId ? (
                  <button
                    className="TodoList__user-button--selected button"
                    type="button"
                    onClick={() => {
                      selectUser(0);
                    }}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                ) : (
                  <button
                    className="
                    TodoList__user-button
                    button
                  "
                    type="button"
                    onClick={() => {
                      selectUser(todo.userId);
                    }}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
