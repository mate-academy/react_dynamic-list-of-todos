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

  setNewTitle = (subtitle) => {
    this.setState({ title: subtitle });
  }

  setNewStatus = (status) => {
    this.setState({ isCompleted: status });
  }

  toggleChange = (todoId) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
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
            setTitle={this.setNewTitle}
            setStatus={this.setNewStatus}
            toggleChange={this.toggleChange}
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
