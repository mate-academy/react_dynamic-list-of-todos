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
    titleFilter: '',
    todoStatus: 'all',
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({ todos });
      });
  }

  selectUser = (userId) => {
    if (userId !== this.state.selectedUserId) {
      this.setState({ selectedUserId: userId });
    }
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  inputHandler = (event) => {
    this.setState({ titleFilter: event.target.value });
  }

  selectHandler = (event) => {
    this.setState({ todoStatus: event.target.value });
  }

  render() {
    const { todos, selectedUserId, titleFilter, todoStatus } = this.state;
    let formatedList;

    const todosFromServer = todos
      .filter(todo => !Object.values(todo).includes(null))
      .filter(todo => todo.title.includes(titleFilter));

    switch (todoStatus) {
      case 'all':
        formatedList = todosFromServer;
        break;
      case 'finished':
        formatedList = todosFromServer.filter(todo => todo.completed === true);
        break;
      case 'unfinished':
        formatedList = todosFromServer.filter(todo => todo.completed === false);
        break;
      default:
        break;
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={formatedList}
            titleFilter={titleFilter}
            selectedUserId={selectedUserId}
            selectUser={this.selectUser}
            inputHandler={this.inputHandler}
            selectHandler={this.selectHandler}
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
