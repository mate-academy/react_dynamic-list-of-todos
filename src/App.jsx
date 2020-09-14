import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUser } from './helper/api';

class App extends React.Component {
  state = {
    todosFromServer: [],
    preparedTodos: [],
    selectedUserId: 0,
    selectedUser: [],
  };

  componentDidMount = async() => {
    const todos = await getTodos();
    const validTodos = todos.filter(todo => todo.userId);

    this.setState({
      todosFromServer: validTodos,
      preparedTodos: validTodos,
    });
  };

  componentDidUpdate = () => {
    const { selectedUser, selectedUserId } = this.state;

    if (selectedUserId !== 0
      && selectedUserId !== selectedUser.id
      && selectedUserId) {
      getUser(selectedUserId)
        .then((user) => {
          if (user) {
            this.setState({ selectedUser: user });
          } else {
            this.setState({ selectedUser: {
              id: '',
              name: 'No user',
            } });
          }
        });
    }
  }

  selectUser = id => this.setState({ selectedUserId: id });

  onClear = () => {
    this.setState({
      selectedUser: [],
      selectedUserId: 0,
    });
  }

  filterByTitle = (query) => {
    this.setState(state => ({
      preparedTodos: state.todosFromServer.filter(todo => (todo.title
        ? todo.title.includes(query)
        : '')),
    }));
  }

  filterByCompleted = (status) => {
    this.setState(state => ({
      preparedTodos: state.todosFromServer.filter((todo) => {
        switch (status) {
          case 'completed':
            return todo.completed;
          case 'active':
            return !todo.completed;
          default:
            return todo;
        }
      }),
    }));
  }

  render() {
    const { preparedTodos, selectedUserId, selectedUser } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={preparedTodos}
            selectUser={this.selectUser}
            filterByTitle={this.filterByTitle}
            filterByCompleted={this.filterByCompleted}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId && selectedUser ? (
              <CurrentUser
                onClear={this.onClear}
                {...selectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
