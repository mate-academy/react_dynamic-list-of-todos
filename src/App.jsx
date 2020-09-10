import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos, getUser } from './api/api';

class App extends React.Component {
  state = {
    todosFromServer: [],
    filteredTodos: [],
    selectedUserId: 0,
    selectedUser: [],
  };

  selectedUser = (selectedUserId) => {
    this.setState({ selectedUserId });
  };

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
      selectedUser: [],
    });
  }

  searchByTitle = (title) => {
    this.setState(state => ({
      filteredTodos: [...state.todosFromServer].filter((todo) => {
        if (!title) {
          return todo;
        }

        if (todo.title !== null) {
          return todo.title.toLowerCase()
            .includes(title.toLowerCase());
        }

        return null;
      }),
    }));
  };

  searchByCompleteness = (completeness) => {
    const { todosFromServer } = this.state;

    const todosBySelect = todosFromServer.filter((todo) => {
      switch (completeness) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todo;
      }
    });

    this.setState({ filteredTodos: todosBySelect });
  };

  componentDidMount = async() => {
    const todos = await getTodos();

    this.setState({
      todosFromServer: todos,
      filteredTodos: todos,
    });
  };

  componentDidUpdate = (prevProps) => {
    const { selectedUserId, selectedUser } = this.state;

    if (selectedUserId !== 0
      && selectedUserId
      && selectedUserId !== selectedUser.id) {
      getUser(selectedUserId)
        .then((user) => {
          if (user) {
            this.setState({ selectedUser: user });
          } else {
            const defaultUser = {
              id: '',
              name: 'No user added',
            };

            this.setState({ selectedUser: defaultUser });
          }
        });
    }
  }

  render() {
    const { filteredTodos, selectedUserId, selectedUser } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredTodos}
            selectedUserId={selectedUserId}
            selectedUser={this.selectedUser}
            onTitle={this.searchByTitle}
            onSelect={this.searchByCompleteness}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId && selectedUser ? (
              <CurrentUser
                {...selectedUser}
                clear={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
