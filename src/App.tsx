import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getAllTodos } from './Api/api';

interface State {
  todos: Todo[];
  selectedUserId: number;
  query: string;
  selectorStatus: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    query: '',
    todos: [],
    selectorStatus: 0,
  };

  async componentDidMount() {
    const tod = await getAllTodos();

    this.setState({ todos: tod });
  }

  getSelectedUserId = (id: number) => {
    this.setState((
      { selectedUserId: id }
    ));
  };

  handleButtonFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value,
    });
  };

  getFilteredData = () => {
    if (this.state.query) {
      const filterTodos = this.state.todos.filter((e) => {
        const lowerCaseQuery = this.state.query.toLowerCase();

        return (
          e.title.toLowerCase().includes(lowerCaseQuery)
        );
      });

      return filterTodos;
    }

    if (this.state.selectorStatus === 1) {
      const sort = this.state.todos.filter(todo => todo.completed === false);

      return sort;
    }

    if (this.state.selectorStatus === 2) {
      const sort = this.state.todos.filter(todo => todo.completed === true);

      return sort;
    }

    return this.state.todos;
  };

  handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectorStatus: +event.target.value,
    });
  };

  handleRandomize = () => {
    const { todos } = this.state;

    const random = todos.sort(() => Math.random() - 0.5);

    this.setState({ todos: random });
  };

  render() {
    const {
      selectedUserId, query, selectorStatus,
    } = this.state;
    const filteredList = this.getFilteredData();

    if (!filteredList) {
      return 'Where user?';
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredList}
            selectedUserId={this.getSelectedUserId}
            filter={this.handleButtonFilter}
            query={query}
            filterStatus={this.handleStatusFilter}
            selectorStatus={selectorStatus}
            random={this.handleRandomize}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                functSelectUser={this.getSelectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
