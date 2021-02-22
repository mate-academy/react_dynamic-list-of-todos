import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const allTodos = await request('todos');

    this.setState({ todos: allTodos });
  }

  setSelectedUserId = (value) => {
    this.setState({ selectedUserId: value });
  }

  clearUserInfo = () => {
    this.setState({ selectedUserId: 0 });
  }

  shuffleTodos = (todos) => {
    const shuffledTodos = [...todos];

    for (let i = shuffledTodos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffledTodos[i], shuffledTodos[j]]
       = [shuffledTodos[j], shuffledTodos[i]];
    }

    this.setState(state => ({
      ...state,
      todos: shuffledTodos,
    }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            setSelectedUserId={this.setSelectedUserId}
            todos={todos}
            shuffleTodos={this.shuffleTodos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                clearUserInfo={this.clearUserInfo}
                userId={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
