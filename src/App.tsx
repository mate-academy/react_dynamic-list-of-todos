import React, { Component } from 'react';
import './App.css';
import { Todo, SortFields, SortButton } from './components/Interfaces';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { Button } from './components/Button';

interface State {
  todos: Todo[];
  sortField: string;
  sortReverse: boolean;
  isLoading: boolean;
  isLoaded: boolean;
}
const SORT_FIELDS: SortFields = {
  id: 'id',
  name: 'name',
  title: 'title',
  completed: 'completed',
};
const SORT_BUTTONS: SortButton[] = [
  {
    name: 'Id',
    field: SORT_FIELDS.id,
  },
  {
    name: 'Name',
    field: SORT_FIELDS.name,
  },
  {
    name: 'Title',
    field: SORT_FIELDS.title,
  },
  {
    name: 'Completed',
    field: SORT_FIELDS.completed,
  },
];

class App extends Component {
  state: State = {
    todos: [],
    sortField: SORT_FIELDS.id,
    sortReverse: false,
    isLoading: false,
    isLoaded: false,
  };

  loadGoods = () => {
    this.setState({ isLoading: true });

    getTodos()
      .then(todos => this.setState({ todos, isLoaded: true }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSortButton = (field: string) => {
    const { sortField, sortReverse } = this.state;
    const reversStatus = (sortField === field) ? !sortReverse : sortReverse;

    this.setState(() => ({
      sortField: field,
      sortReverse: reversStatus,
    }));
  };

  sortTodos = () => {
    const { todos, sortField, sortReverse } = this.state;
    const sortDirection = (sortReverse) ? -1 : 1;

    if (sortField === SORT_FIELDS.id) {
      return [...todos].sort((a, b) => (
        this.compareNumbers(a.id, b.id) * sortDirection));
    }

    if (sortField === SORT_FIELDS.title) {
      return [...todos].sort((a, b) => (
        this.compareStrings(a.title, b.title) * sortDirection));
    }

    if (sortField === SORT_FIELDS.name) {
      return [...todos].sort((a, b) => (
        this.compareStrings(a.user.username, b.user.username) * sortDirection));
    }

    if (sortField === SORT_FIELDS.completed) {
      return [...todos].sort((a, b) => (
        this.compareBoolean(a.completed, b.completed) * sortDirection));
    }

    return todos;
  };

  compareNumbers = (a: number, b: number) => {
    return (a - b);
  };

  compareStrings = (a: string, b: string) => {
    return (a.localeCompare(b));
  };

  compareBoolean= (a: boolean, b: boolean) => {
    return (Number(b) - Number(a));
  };

  render() {
    const { isLoading, isLoaded } = this.state;
    const sortedTodos: Todo[] = this.sortTodos();

    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-1">List of TODOs</h1>
          {!isLoading && !isLoaded && (
            <Button
              text="Load ToDos"
              className="button"
              handleClick={this.loadGoods}
            />
          )}
          {isLoading && <progress className="progress is-primary is-info" max="100" />}
          {isLoaded && (
            <TodoList
              todos={sortedTodos}
              SORT_BUTTONS={SORT_BUTTONS}
              handleSortButton={this.handleSortButton}
            />
          )}
        </div>
      </section>
    );
  }
}

export default App;
