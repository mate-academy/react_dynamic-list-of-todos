import React from 'react';
import './App.css';
import { AppState, Todo, ControlPanel } from './components/interfaces';
import { DownloadButton } from './components/DownloadButton';
import { allTodosDatas } from './components/getTodos';
import ListTodos from './components/TodosList';
import { SortedPanel } from './components/SortedPanel';

class App extends React.Component {
  state: AppState = {
    todos: [],
    sortedBy: 'id',
    isLoading: false,
    isLoaded: false,
  };

  getTodos = () => {
    this.setState({ isLoading: true });
    allTodosDatas()
      .then(todos => this.setState({ todos, isLoaded: true }))
      .finally(() => this.setState({ isLoading: false }));
  };

  sortByField = (field: string) => {
    const { todos } = this.state;

    const newTodos = [...todos
      .sort((a: Todo, b: Todo): number => {
        const comperator1 = a[field] || a.user[field] || false;
        const comperator2 = b[field] || b.user[field] || false;

        if (typeof comperator1 === 'number' || typeof comperator1 === 'boolean') {
          return Number(comperator1) - Number(comperator2);
        }

        if (typeof comperator1 === 'string') {
          return comperator1.localeCompare(comperator2 as string);
        }

        return 0;
      })];

    this.setState({ todos: newTodos });
  };

  changeSortPage = (page: string) => {
    const { sortedBy, todos } = this.state;

    if (sortedBy === page) {
      const reverseTodos: Todo[] = [...todos].reverse();

      this.setState({ todos: reverseTodos });
    } else {
      this.setState(() => ({ sortedBy: page }),
        () => this.sortByField(this.state.sortedBy));
    }
  };

  render() {
    const { todos, isLoaded, isLoading } = this.state;
    const sortedPanelInfo: ControlPanel[] = [
      {
        name: 'ID', link: '#id', sortedName: 'id', clickEvent: this.changeSortPage,
      },
      {
        name: 'Sort by name', link: '#name', sortedName: 'username', clickEvent: this.changeSortPage,
      },
      {
        name: 'Sort by title', link: '#title', sortedName: 'title', clickEvent: this.changeSortPage,
      },
      {
        name: 'Sort by status', link: '#status', sortedName: 'completed', clickEvent: this.changeSortPage,
      },
    ];

    return (
      <>
        {!isLoaded && (
          <DownloadButton
            getTodos={this.getTodos}
            isLoading={isLoading}
          />
        )}
        {isLoading && (
          <p className="loading">Loading data...</p>
        )}
        {isLoaded && !isLoading && (
          <>
            <h1 className="header">List Todos</h1>
            <SortedPanel
              sortedPanelInfo={sortedPanelInfo}
            />
            <ListTodos
              todos={todos}
            />
          </>
        )}
      </>
    );
  }
}

export default App;
