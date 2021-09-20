import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos :Todo[];
  setSelectedUserId: (id:number)=>void;
  selectedUserId: number;
};

type State = {
  todos: Todo[];
  filterByText: string;
  filterByStatus: string;
};

export class TodoList extends React.Component<Props, State> {
  state = {
    todos: this.props.todos,
    filterByText: '',
    filterByStatus: 'All',
  };

  filterTodos = (text:string | null, status:string | null) => {
    if (status === null && text !== null) {
      this.setState({
        filterByText: text,
      });
    }

    if (text === null) {
      switch (status) {
        case ('All'):
          this.setState({
            filterByStatus: 'All',
          });
          break;
        case ('Completed'):
          this.setState({
            filterByStatus: 'Completed',
          });
          break;
        case ('In Progress'):
          this.setState({
            filterByStatus: 'In Progress',
          });
          break;
        default:
          throw new Error('wrong task status');
      }
    }

    this.setState(
      state => {
        return ({
          todos: this.props.todos.filter(
            (todo) => {
              switch (state.filterByStatus) {
                case ('All'):
                  return true;
                case ('Completed'):
                  return todo.completed;
                case ('In Progress'):
                  return !todo.completed;
                default:
                  throw new Error('wrong task status');
              }
            },
          ).filter(
            todo => todo.title.includes(state.filterByText),
          ),
        });
      },
    );
  };

  randomList = () => {
    this.setState(
      state => ({
        todos: [...state.todos].sort(() => (Math.random() - 0.5)),
      }),
    );
  };

  render() {
    const { setSelectedUserId, selectedUserId } = this.props;
    const { todos, filterByText } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="ButtonBlock">
          <input
            type="text"
            className="TittleFilterInput"
            value={filterByText}
            placeholder="Filter list by title"
            onChange={(event) => this.filterTodos(event.target.value, null)}
          />
          <button
            type="button"
            className="RandomListButton"
            onClick={() => this.randomList()}
          >
            Randomize
          </button>
          <select
            className="TaskStatusSelect"
            onChange={(event) => this.filterTodos(null, event.target.value)}
          >
            <option value="All" className="SelectAll">All</option>
            <option value="Completed" className="SelectCompleted">Completed</option>
            <option value="In Progress" className="SelectProgress">In Progress</option>
          </select>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" disabled checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('TodoList__user-button', {
                    'TodoList__user-button--unselected button': !(todo.userId === selectedUserId),
                    'TodoList__user-button--selected button': todo.userId === selectedUserId,
                  })}
                  type="button"
                  onClick={() => setSelectedUserId(todo.userId)}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
