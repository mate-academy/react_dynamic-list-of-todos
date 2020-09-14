import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    user: {},
    status: 'all',
    query: '',
  };

  componentDidMount = async() => {
    const todos = await getTodos();

    this.setState({
      todos: todos.data.filter(todo => todo.userId),
    });
  }

  componentDidUpdate = () => {
    if (this.state.selectedUserId !== 0
      && this.state.selectedUserId !== this.state.user.id
      && this.state.selectedUserId) {
      getUser(this.state.selectedUserId)
        .then((user) => {
          if (user.data !== null) {
            this.setState({ user: user.data });
          } else {
            this.setState(state => ({ user: {
              id: state.selectedUserId,
              name: 'No name',
              email: 'No email',
              phone: 'No phone',
            } }));
          }
        });
    }
  }

  selectUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  onClear = () => {
    this.setState({
      user: {},
      selectedUserId: 0,
    });
  }

  render() {
    const { selectedUserId, todos, user, query, status } = this.state;

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
                onClear={this.onClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
