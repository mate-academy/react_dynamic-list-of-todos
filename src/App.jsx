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
    query: '',
    status: 'all',
  };

  componentDidMount() {
    getTodos().then((data) => {
      this.setState({
        todos: data.data,
      });
    });
  }

  selectUser = (id) => {
    this.setState({
      selectedUserId: id,
    });
  }

  hendlerChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  getVisibleTodos = (todos) => {
    const normalizedQuery = this.state.query.toLowerCase();

    return todos.filter(
      (todo) => {
        if (todo.title === null) {
          return;
        }

        return todo.title.toLowerCase().includes(normalizedQuery); // eslint-disable-line
      },
    );
  }

  getComplitedTodos = todos => todos.filter(
    (todo) => {
      switch (this.state.status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    },
  )

  render() {
    const { selectedUserId, query, todos } = this.state;

    const prepairTodos = this.getComplitedTodos(this.getVisibleTodos(todos));

    return (
      <div className="App">
        <div className="App__sidebar">

          <div className="App__filter">

            <p>Search</p>
            <input
              type="text"
              name="query"
              value={query}
              onChange={this.hendlerChange}
            />

            <select
              name="status"
              onChange={this.hendlerChange}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed </option>
            </select>
          </div>

          <TodoList
            todos={prepairTodos}
            onSelectedUser={this.selectUser}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onSelectedUser={this.selectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
