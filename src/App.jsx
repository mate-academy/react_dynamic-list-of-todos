import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './API';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    query: '',
    status: 'All',
  };

  componentDidMount() {
    getTodos()
      .then(todos => this.setState({
        todos: todos.filter(todo => todo.userId != null),
      }));
  }

  selectUser = (event) => {
    const { value } = event.target;

    this.setState({ selectedUserId: value });
  }

  clearUserInfo = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId, query, status } = this.state;

    return (
      <div className="App">
        <div className="app__sidebar">
          <input
            className="app__search"
            type="text"
            placeholder="Title"
            value={query}
            onChange={(event) => {
              this.setState({ query: event.target.value });
            }}
          />
          <select
            onChange={(event) => {
              this.setState({ status: event.target.value });
            }}
            className="app__visible"
          >
            <option value="All">All</option>
            <option value="Done">Done</option>
            <option value="In progress">In progress</option>
          </select>
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            query={query}
            status={status}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearInfo={this.clearUserInfo}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
