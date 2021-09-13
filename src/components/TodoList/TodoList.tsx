import React from 'react';
import classNames from 'classnames';
import { Task } from '../types/Task';
import './TodoList.scss';

type Props = {
  todo: Task[],
  setUser: any,
  selectedUserId: number,
};

export class TodoList extends React.Component<Props> {
  state = {
    prevId: 0,
    value: '',
    sortBy: 'All',
  };

  render() {
    const { todo, setUser, selectedUserId } = this.props;
    const { prevId, value, sortBy } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div>
          <label
            htmlFor="sort_title"
          >
            Filter
            <input
              id="sort_title"
              value={value}
              onChange={(event) => {
                this.setState({
                  value: event.target.value,
                });
              }}
              name="Sort by title"
            />
          </label>
        </div>

        <select
          onChange={(event) => {
            this.setState({ sortBy: event.target.value });
          }}
        >
          <option>All</option>

          <option>Active</option>

          <option>Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {
              todo.filter((elem: Task) => {
                const seach = elem.title ? elem.title : '';

                return seach.includes(value);
              }).filter((sorted: Task) => {
                switch (sortBy) {
                  case 'Active':
                    return !sorted.completed;

                  case 'Completed':
                    return sorted.completed;

                  default:
                    return sorted;
                }
              }).map((task: Task) => {
                return (
                  <li
                    key={task.id}
                    className={
                      `TodoList__item
                  ${task.completed ? 'TodoList__item--checked' : 'TodoList__item--unchecked'}`
                    }
                  >
                    <label>
                      <input
                        checked={task.completed}
                        type="checkbox"
                        readOnly
                      />
                      <p>{task.title}</p>
                    </label>

                    <button
                      className={classNames(
                        'TodoList__user-button',
                        'button',
                        { 'TodoList__user-button--selected': (prevId === task.id && selectedUserId !== 0) },
                      )}
                      type="button"
                      onClick={() => {
                        setUser(task.userId);
                        this.setState({ prevId: task.id });
                      }}
                    >
                      {`User #${task.userId}`}
                    </button>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
