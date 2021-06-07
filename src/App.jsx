import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './components/API/api';

let allTodos;

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    allTodos = await request('/todos');
    this.setState({ todos: allTodos });
  }

  handleClick = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  active = () => {
    this.setState({
      todos: allTodos.filter(todo => todo.completed === false),
    });
  }

  completed = () => {
    this.setState({
      todos: allTodos.filter(todo => todo.completed === true),
    });
  }

  all = () => {
    this.setState({
      todos: allTodos,
    });
  }

  resetSelectedUserId = () => this.setState({ selectedUserId: 0 })

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            callback={this.handleClick}
            active={this.active}
            completed={this.completed}
            all={this.all}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                reset={this.resetSelectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
