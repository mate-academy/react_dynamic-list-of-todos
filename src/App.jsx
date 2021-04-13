import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api'

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  selectUserId = (id) => {
    this.setState({ selectedUserId: id });
  }

  clearUserId = () => {
    this.setState({ selectedUserId: 0 });
  }

  checkHandler = (id) => {
    this.setState(state => ({
      todos: state.todos.map(todo => (
        todo.id === id
          ? { 
            ...todo,
            completed: !todo.completed,
          } : todo
      )),
    }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUserId={this.selectUserId}
            checkHandler={this.checkHandler}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
