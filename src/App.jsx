import React from 'react';

import './App.scss';
import './styles/general.scss';

import getData from './api/api';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const url = 'todos';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    titleFilter: '',
    todoStatus: 'all',
  };

  componentDidMount() {
    getData(url)
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

    const formatedList = todos
      .filter(todo => !Object.values(todo).includes(null))
      .filter(todo => todo.title.includes(titleFilter))
      .filter((todo) => {
        switch (todoStatus) {
          case ('all'):
            return true;
          case (todo.completed.toString()):
            return true;
          default:
            return false;
        }
      });

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
