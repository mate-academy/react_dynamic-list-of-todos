import React from 'react';

import './App.scss';
import './styles/general.scss';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    query: '',
    selection: 'Select all',
  };

  componentDidMount() {
    getTodos()
      .then(todos => this.setState({
        todos: todos.filter(todo => todo.userId !== null),
      }));
  }

  selectUser = ({ target }) => {
    this.setState({ selectedUserId: target.value });
  }

  handleUserClear = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId, query, selection } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <input
            className="App__searchbar"
            type="text"
            placeholder="Type a todo here..."
            value={query}
            onChange={(event) => {
              this.setState({ query: event.target.value });
            }}
          />
          <select
            onChange={event => this.setState({
              selection: event.target.value,
            })
            }
            className="App__select"
          >
            <option value="Select all">
              Select all
            </option>
            <option value="Select completed">
              Select completed
            </option>
            <option value="Select not completed">
              Select not completed
            </option>
          </select>
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            query={query}
            selection={selection}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearHandler={this.handleUserClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
