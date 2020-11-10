import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos, getUser } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getAllTodos()
      .then(data => data.filter(({ id, title }) => id && title))
      .then(todos => this.setState({
        todos,
      }));
  }

  selectUser = (id) => {
    this.setState({
      selectedUserId: id,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  shuffleTodos = () => {
    const { todos } = this.state;
    const shuffledTodos = [...todos];

    for (let i = shuffledTodos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [
        shuffledTodos[i],
        shuffledTodos[j],
      ] = [
        shuffledTodos[j],
        shuffledTodos[i],
      ];
    }

    this.setState({
      todos: shuffledTodos,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;
    const { selectUser, clearUser, shuffleTodos } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={selectUser}
            shuffleTodos={shuffleTodos}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                getUser={getUser}
                clearUser={clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
