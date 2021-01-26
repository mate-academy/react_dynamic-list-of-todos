import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    loadError: false,
  };

  componentDidMount = async() => {
    try {
      await getAllTodos().then((todos) => {
        this.setState({ todos: todos.data });
      });
    } catch (error) {
      this.setState({ loadError: true });
    }
  }

  onUserSelect = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  onUserClear = () => {
    this.setState({ selectedUserId: 0 });
  }

  shuffleTodos = () => {
    this.setState(({ todos }) => {
      const shuffledTodos = [...todos];
      let index = shuffledTodos.length;

      while (index) {
        const pick = Math.floor(Math.random() * index);
        // eslint-disable-next-line
        index--;
        const temp = shuffledTodos[index];

        shuffledTodos[index] = shuffledTodos[pick];
        shuffledTodos[pick] = temp;
      }

      return {
        todos: shuffledTodos,
      };
    });
  }

  render() {
    const { todos, selectedUserId, loadError } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onUserSelect={this.onUserSelect}
            todosLoaded={!loadError}
            onShuffle={this.shuffleTodos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.onUserClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
