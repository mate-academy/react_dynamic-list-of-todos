import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUsers } from './api/api';

class App extends React.PureComponent {
  state = {
    todos: [],
    selectedUserId: 0,
    user: {},
    status: 'all',
    query: '',
  };

  componentDidMount() {
    getTodos()
      .then((res) => {
        this.setState({
          todos: res.data.filter(todo => (
            todo.title && todo.id
          )),
        });
      });
  }

  componentDidUpdate() {
    if (this.state.selectedUserId !== 0
      && this.state.selectedUserId !== this.state.user.id
      && this.state.selectedUserId) {
      getUsers(this.state.selectedUserId)
        .then((user) => {
          if (user.data !== null) {
            this.setState({
              user: user.data,
            });
          } else {
            this.setState(state => ({ user: {
              id: state.selectedUserId,
              name: 'No name',
              email: 'No email',
              phone: 'No Name',
            } }));
          }
        });
    }
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearUser = () => {
    this.setState({
      user: {},
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId, query, status, user } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <select
            onChange={event => this.setState({ status: event.target.value })
            }
          >
            <option value="all">
              All
            </option>
            <option value="active">
              Active
            </option>
            <option value="completed">
              Completed
            </option>
          </select>

          <input
            type="text"
            placeholder="Find todo"
            onChange={event => this.setState({ query: event.target.value })}
          />

          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            query={query}
            status={status}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId && user ? (
              <CurrentUser
                {...user}
                onClear={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
