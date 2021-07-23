import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getAllTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 4,
    query: '',
    status: 'both',
  };

  componentDidMount() {
    getAllTodos()
      .then(response => response.data)
      .then((todos) => {
        this.setState({
          todos,
        });
      });
  }

  clearSelectedUserId = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  setSelectedUserId = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  setTodoStatus = ({ target }) => {
    this.setState({
      status: target.value,
    });
  }

  setSearchQuery = ({ target }) => {
    this.setState({
      query: target.value,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos.filter((todo) => {
              const title = todo.title === null ? '' : todo.title.toLowerCase();
              const query = this.state.query.toLowerCase();
              let hasStatus;

              switch (this.state.status) {
                case 'in-progress': {
                  hasStatus = !todo.completed;
                  break;
                }

                case 'completed': {
                  hasStatus = todo.completed;
                  break;
                }

                default: {
                  hasStatus = true;
                  break;
                }
              }

              return title.includes(query) && hasStatus;
            })}
            selectedUserId={selectedUserId}
            onUserSelect={this.setSelectedUserId}
            setSearchQuery={this.setSearchQuery}
            setTodoStatus={this.setTodoStatus}
            todoStatus={this.state.status}
            query={this.state.query}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearSelectedUserId={this.clearSelectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
