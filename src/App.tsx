/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './Types/Todo';
import { getTodoList } from './API/api';

interface State {
  selectedUserId: number;
  todos: Todo[],
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  componentDidMount() {
    this.setTodos();
  }

  setTodos() {
    getTodoList().then(
      (result) => {
        this.setState({ todos: result });
      },
    );
  }

  changeUserId(newUserId: number) {
    this.setState(() => ({ selectedUserId: newUserId }));
  }

  clearUser() {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} onUserClick={this.changeUserId.bind(this)} />
        </div>
        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser UserId={selectedUserId} onClearUser={this.clearUser.bind(this)} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
