import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUserInfo } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    title: '',
    isCompleted: '',
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({ todos });
      });
  }

  setUserId = (id) => {
    this.setState({ selectedUserId: id });
  }

  clearUserId = () => {
    this.setState({ selectedUserId: '' });
  }

  filteredByTitle = (subtitle) => {
    this.setState({ title: subtitle });
  }

  filteredByStatus = (status) => {
    this.setState({ isCompleted: status });
  }

  render() {
    const { todos, selectedUserId, title, isCompleted } = this.state;
    let visibleTodos = todos.filter(todo => todo.title.includes(title));

    if (isCompleted === 'completed') {
      visibleTodos = visibleTodos.filter(todo => todo.completed === true);
    }

    if (isCompleted === 'active') {
      visibleTodos = visibleTodos.filter(todo => todo.completed === false);
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={visibleTodos}
            setId={this.setUserId}
            filterByTitle={this.filteredByTitle}
            filterByStatus={this.filteredByStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                getInfo={getUserInfo}
                clearUserId={this.clearUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
