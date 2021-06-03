import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './components/API/api';

const URL = 'https://mate-api.herokuapp.com';

let allTodos;

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    allTodos = await request(URL, '/todos');
    this.setState({ todos: allTodos });
  }

  handleClick = (event) => {
    const { textContent, classList } = event.target;

    classList.add('TodoList__user-button--selected');
    this.setState({ selectedUserId: +textContent[textContent.length - 1] });
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
