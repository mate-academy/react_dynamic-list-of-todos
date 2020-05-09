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
  name: 'username',
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
    const reversStatus = (sortField === field) ? !sortReverse : false;

    this.setState(() => ({
      sortField: field,
      sortReverse: reversStatus,
    }));
  };

  sortTodos = () => {
    const { todos, sortField, sortReverse } = this.state;
    const sortDirection = (sortReverse) ? -1 : 1;

    return [...todos].sort((a: Todo, b: Todo): number => {
      const aField = a[sortField] || a.user[sortField] || false;
      const bField = b[sortField] || b.user[sortField] || false;


      if (typeof aField === 'number') {
        return (aField - (bField as number)) * sortDirection;
      }

      if (typeof aField === 'boolean') {
        return (Number(aField) - Number(bField)) * -sortDirection;
      }

      if (typeof aField === 'string') {
        return aField.localeCompare(bField as string) * sortDirection;
      }

      return 0;
    });
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
