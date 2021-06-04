import React from 'react';

import './App.scss';
import './styles/general.scss';

import { getTodos } from './api/api';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    searchQuery: '',
    completedFilter: 'all',
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({
          todos,
        });
      });
  }

  selectUser = (selectedUserId) => {
    this.setState({ selectedUserId });
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  getVisibleTodos = (todos, searchQuery) => {
    const normalizedQuery = searchQuery.toLowerCase();

    return todos.filter(todo => todo.title
      && todo.title.toLowerCase().includes(normalizedQuery));
  }

  filterCompletedTodos = (todos, completedFilter) => todos.filter(todo => (
    completedFilter === 'completed'
      ? todo.completed
      : !todo.completed
  ))

  render() {
    const { todos, selectedUserId, searchQuery, completedFilter } = this.state;

    let visibleTodos = this.getVisibleTodos(todos, searchQuery);

    if (completedFilter !== 'all') {
      visibleTodos = this.filterCompletedTodos(visibleTodos, completedFilter);
    }

    return visibleTodos.length > 0 ? (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            searchQuery={searchQuery}
            completedFilter={completedFilter}
            visibleTodos={visibleTodos}
            selectedUserId={selectedUserId}
            onHandleChange={this.handleChange}
            onUserSelected={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClearSelectUser={this.selectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    ) : (<p>Loading...</p>);
  }
}

export default App;
