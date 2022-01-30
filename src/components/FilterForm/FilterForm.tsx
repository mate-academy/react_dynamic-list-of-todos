import React, { Component } from 'react';

type State = {
  searchField: string;
  statusOfTodos: string;
};

type Props = {
  handleFilterTodos: (filterTodos: FilterTodosCallback, sybstr: string, status: string) => void;
};

export class FilterForm extends Component<Props, State> {
  state = {
    searchField: '',
    statusOfTodos: 'any',
  };

  filterTodos = (todos: Todo[], substr: string, status: string): Todo[] => {
    let filteredTodos;

    switch (status) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = [...todos];
    }

    return filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(substr.toLocaleLowerCase())
    ));
  };

  handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    this.setState({ searchField: value });
    this.props.handleFilterTodos(this.filterTodos, value, this.state.statusOfTodos);
  };

  handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;

    this.setState({ statusOfTodos: value });
    this.props.handleFilterTodos(this.filterTodos, this.state.searchField, value);
  };

  render() {
    const { searchField, statusOfTodos } = this.state;

    return (
      <div>
        <label htmlFor="filter">
          Filter by title
          <input
            type="text"
            id="filter"
            value={searchField}
            onChange={this.handleChangeSearch}
          />
        </label>
        <select
          value={statusOfTodos}
          onChange={this.handleChangeSelect}
        >
          <option value="any">Show all</option>
          <option value="active">Show active</option>
          <option value="completed">Show completed</option>
        </select>
      </div>
    );
  }
}
