import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './types';

interface State {
  selectedUserId: number;
  todos: Todo[];
  searchQuery: string;
  selectedStatus: 'all' | 'active' | 'completed';
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    searchQuery: '',
    selectedStatus: 'all',
  };

  componentDidMount() {
    fetch('https://mate.academy/students-api/todos')
      .then(response => response.json())
      .then(todos => this.setState({ todos }));
  }

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  getTodosList = (searchQuery: string) => (
    this.state.todos.filter(todo => {
      return todo.title.toLocaleLowerCase().includes(searchQuery)
        && (this.state.selectedStatus === 'all'
          ? true
          : todo.completed === (this.state.selectedStatus === 'completed'));
    })
  );

  handleSearchQuery = (value:string) => {
    this.setState({ searchQuery: value });
  };

  handleSelectedStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === 'all' || value === 'completed' || value === 'active') {
      this.setState({ selectedStatus: value });
    }
  };

  render() {
    const { selectedUserId, searchQuery, selectedStatus } = this.state;
    const query = searchQuery.toLocaleLowerCase();
    const visibleTodos = this.getTodosList(query);

    return (
      <div className="App">
        <div className="App__sidebar">
          <input
            type="text"
            id="search-query"
            placeholder="Type search word"
            value={searchQuery}
            onChange={event => this.handleSearchQuery(event.target.value)}
          />

          <select
            value={selectedStatus}
            onChange={this.handleSelectedStatus}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <TodoList
            todos={visibleTodos}
            selectedUserId={selectedUserId}
            onSelectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
