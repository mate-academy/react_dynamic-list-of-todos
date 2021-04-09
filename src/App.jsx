import React from 'react';
import './App.scss';
import './styles/general.scss';
import Button from '@material-ui/core/Button';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getAllTodos()
      .then((todos) => {
        const result = this.filterTodos(todos);

        this.setState({ todos: result });
      });
  }

  filterTodos = todos => todos
    .filter(todo => typeof todo.userId === 'number')
    .filter(todo => typeof todo.completed === 'boolean')
    .filter(todo => todo.title !== '')

  checkedHandler = (todoID) => {
    this.setState((prevState) => {
      const item = [...prevState.todos].find(element => element.id === todoID);

      item.completed = !item.completed;

      return {
        todos: [...prevState.todos],
      };
    });
  }

  selectUserHandler = (userID) => {
    this.setState({ selectedUserId: userID });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  shuffleTodos = (todo) => {
    for (let i = todo.length - 1; i > 0; i -= 1) {
      const random = Math.floor(Math.random() * (i + 1));

      // eslint-disable-next-line no-param-reassign
      [todo[i], todo[random]] = [todo[random], todo[i]];
    }

    this.setState({ todos: todo });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              this.shuffleTodos(todos);
            }}
          >
            Randomize
          </Button>
          <TodoList
            todos={todos}
            checkedHandler={this.checkedHandler}
            selectUserHandler={this.selectUserHandler}
            shuffleTodos={this.shuffleTodos}
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
