import React from 'react';
import './App.scss';
import './styles/general.scss';
import 'bulma/css/bulma.min.css';

import { getAll } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  todos: Todo[];
  selectedUserId: number;
  query: string;
  filterBy: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    query: '',
    filterBy: 'all',
  };

  async componentDidMount() {
    const todos = await getAll();

    this.setState({ todos });
  }

  selectUser = (userId: number) => {
    if (this.state.selectedUserId !== userId) {
      this.setState({
        selectedUserId: userId,
      });
    }
  };

  clearUser = () => (
    this.setState({ selectedUserId: 0 })
  );

  handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value.toLowerCase(),
    });
  };

  handleSelectorInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      filterBy: event.target.value,
    });
  };

  getFilteredTodos = () => (
    this.state.todos.filter(todo => todo.title.toLowerCase().includes(this.state.query))
  );

  render() {
    const { selectedUserId, filterBy, query } = this.state;

    let visibleTodos = this.getFilteredTodos();

    visibleTodos = visibleTodos.filter(todo => {
      switch (filterBy) {
        case 'all':
          return todo;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return 0;
      }
    });

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            visibleTodos={visibleTodos}
            query={query}
            filterBy={filterBy}
            selectUser={this.selectUser}
            handleSearch={this.handleSearch}
            handleSelectorInput={this.handleSelectorInput}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
