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
    order: {
      sortId: true,
      sortName: false,
      sortTitle: false,
      sortStatus: false,
    },
    isLoading: false,
    isLoadDatas: false,
  };

  getTodos = () => {
    this.setState({ isLoading: true });
    allTodosDatas()
      .then(todos => this.setState({ todos, isLoadDatas: true }))
      .finally(() => this.setState({ isLoading: false }));
  };

  sortByName = () => {
    const { todos } = this.state;
    const { sortName } = this.state.order;
    let sortedTodos: Todo[];

    if (!sortName) {
      sortedTodos = [...todos
        .sort((a: Todo, b: Todo) => a.user?.username.localeCompare(b.user?.username)),
      ];
    } else {
      sortedTodos = [...todos
        .sort((a: Todo, b: Todo) => b.user?.username.localeCompare(a.user?.username)),
      ];
    }

    const changeOrder = !sortName;

    this.setState(({ todos: sortedTodos, order: { sortName: changeOrder } }));
  };

  sortByTitle = () => {
    const { todos } = this.state;
    const { sortTitle } = this.state.order;
    let sortedTodos: Todo[];

    if (!sortTitle) {
      sortedTodos = [...todos
        .sort((a: Todo, b: Todo) => a.title.localeCompare(b.title)),
      ];
    } else {
      sortedTodos = [...todos
        .sort((a: Todo, b: Todo) => b.title.localeCompare(a.title)),
      ];
    }

    const changeOrder = !sortTitle;

    this.setState(({ todos: sortedTodos, order: { sortTitle: changeOrder } }));
  };

  sortByStatus = () => {
    const { todos } = this.state;
    const { sortStatus } = this.state.order;
    let sortedTodos: Todo[];
    const completedTodos: Todo[] = todos.filter(todo => todo.completed);
    const activeTodos: Todo[] = todos.filter(todo => !todo.completed);

    if (!sortStatus) {
      sortedTodos = [...activeTodos, ...completedTodos];
    } else {
      sortedTodos = [...completedTodos, ...activeTodos];
    }

    const changeOrder = !sortStatus;

    this.setState(({ todos: sortedTodos, order: { sortStatus: changeOrder } }));
  };

  sortById = () => {
    const { todos } = this.state;
    const { sortId } = this.state.order;
    let sortedTodos: Todo[];

    if (!sortId) {
      sortedTodos = [...todos
        .sort((a: Todo, b: Todo) => a.id - b.id)];
    } else {
      sortedTodos = [...todos
        .sort((a: Todo, b: Todo) => b.id - a.id)];
    }

    const changeOrder = !sortId;

    this.setState(({ todos: sortedTodos, order: { sortId: changeOrder } }));
  };

  render() {
    const { todos, isLoadDatas, isLoading } = this.state;
    const sortedPanelInfo: ControlPanel[] = [
      { name: 'ID', link: '#id', clickEvent: this.sortById },
      { name: 'Sort by name', link: '#name', clickEvent: this.sortByName },
      { name: 'Sort by title', link: '#title', clickEvent: this.sortByTitle },
      { name: 'Sort by status', link: '#status', clickEvent: this.sortByStatus },
    ];

    return (
      <>
        {!isLoadDatas && (
          <DownloadButton
            getTodos={this.getTodos}
            isLoading={isLoading}
          />
        )}
        {isLoading && (
          <p className="loading">Loading data...</p>
        )}
        {isLoadDatas && !isLoading && (
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
