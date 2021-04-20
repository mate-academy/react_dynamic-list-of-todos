import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getAllTodos().then((todos) => {
      const res = this.filterTodos(todos);

      this.setState({
        todos: res,
      });
    });
  }

  checkedHandler = (todoId) => {
    this.setState((state) => {
      const item = [...state.todos]
        .find(element => element.id === todoId);

      item.completed = !item.completed;

      return {
        todos: [...state.todos],
      };
    });
  }

  filterTodos = todos => todos
    .filter(todo => typeof todo.userId === 'number')
    .filter(todo => typeof todo.completed === 'boolean')
    .filter(todo => todo.title !== '')

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  randomizTodo = (todos) => {
    for (let i = todos.length - 1; i > 0; i -= 1) {
      const random = Math.floor(Math.random() * (i + 1));

      // eslint-disable-next-line no-param-reassign
      [todos[i], todos[random]] = [todos[random], todos[i]];
    }

    this.setState({ todos });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            checkedHandler={this.checkedHandler}
            selecUser={this.selectUser}
            randomizTodo={this.randomizTodo}
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
