import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    query: '',
    valueForFilter: 'all',
  };

  componentDidMount = async() => {
    const allTodos = await getAllTodos();

    this.setState({ todos: allTodos });
  }

  selectUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  setQuery = (value) => {
    this.setState({ query: value });
  }

  selectTodos = (filter) => {
    this.setState({ valueForFilter: filter });
  }

  render() {
    const { todos, selectedUserId, query, valueForFilter } = this.state;
    const queryToFind = query.toLowerCase();
    const todosToShow = todos.filter(
      todo => todo.title
      && todo.userId
      && todo.title.toLowerCase().includes(queryToFind),
    );

    let selectedTodosToSHow = todosToShow;

    if (valueForFilter === 'completed') {
      selectedTodosToSHow = todosToShow.filter(todo => todo.completed);
    } else if (valueForFilter === 'active') {
      selectedTodosToSHow = todosToShow.filter(todo => !todo.completed);
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={selectedTodosToSHow}
            selectUser={this.selectUser}
            setQuery={this.setQuery}
            selectTodos={this.selectTodos}
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
