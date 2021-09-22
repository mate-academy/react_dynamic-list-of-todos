import React from 'react';

type Props = {
  filterTodosByTitle: (title: string) => void;
  filterTodosByStatus: (todoStatus: string, title: string) => void;
};

type State = {
  todoTitle: string;
};

export class Filters extends React.Component<Props, State> {
  state: State = {
    todoTitle: '',
  };

  render() {
    const { todoTitle } = this.state;

    return (
      <div className="App__filters">
        <input
          type="text"
          value={todoTitle}
          placeholder="Search by title"
          className="input is-primary"
          onChange={(event) => {
            this.setState({
              todoTitle: event.target.value,
            });
            this.props.filterTodosByTitle(event.target.value);
          }}
        />
        <p>Filter&#160;by:</p>
        <div className="select is-primary">
          <select
            name="todoStatus"
            onChange={(event) => {
              this.props.filterTodosByStatus(event.target.value, todoTitle);
            }}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>
      </div>
    );
  }
}
