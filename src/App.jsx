import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './helpers';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos().then((todos) => {
      this.setState({ todos });
    });
  }

  handleSelectedUser = (currentId) => {
    this.setState({ selectedUserId: currentId });
  }

  handleClearUserField = () => {
    this.setState({ selectedUserId: 0 });
  }

  handleFilterBySearching = async(value) => {
    let todos = await getTodos();

    todos = todos.filter((todo) => {
      if (!todo.title) {
        return false;
      }

      return (todo.title.includes(value));
    });
    this.setState({ todos });
  }

  handleSelectFilter = async(value) => {
    let callback;

    switch (value) {
      case 'all':
        callback = todo => true;
        break;
      case 'active':
        callback = todo => todo.completed === false;
        break;
      case 'complited':
        callback = todo => todo.completed;
        break;
      default:
        return;
    }

    let todos = await getTodos();

    todos = todos.filter(callback);
    this.setState({ todos });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            handleSelectedUser={this.handleSelectedUser}
            handleFilterBySearching={this.handleFilterBySearching}
            handleSelectFilter={this.handleSelectFilter}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                handleClearUserField={this.handleClearUserField}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
