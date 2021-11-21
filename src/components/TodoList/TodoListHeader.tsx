import React from 'react';
import { Status } from '../../types/FilterStatus';

type Props = {
  filterTodos: (status?: Status) => void;
  handleChange: (value: string, name: string) => void;
  query: string,
  status: Status;
};

export class TodoListHeader extends React.PureComponent<Props, {}> {
  render() {
    const {
      query,
      status,
      filterTodos,
      handleChange,
    } = this.props;

    return (
      <div className="TodoList__header">
        <input
          name="query"
          placeholder="filter"
          className="input"
          value={query}
          onChange={(e) => {
            handleChange(e.target.value, e.target.name);
            filterTodos();
          }}
        />

        <select
          className="select"
          name="status"
          value={status}
          onChange={(e) => {
            handleChange(e.target.value, e.target.name);
          }}
        >
          {Object.entries(Status).map(valueStatus => (
            <option
              key={valueStatus[0]}
              value={valueStatus[1]}
            >
              {valueStatus[1]}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
