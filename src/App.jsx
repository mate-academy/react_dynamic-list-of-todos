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
    getAllTodos().then(data => this.setState({
      todos: data,
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
    const shuffledTodos = [...todos].sort(() => 0.5 - Math.random());

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
