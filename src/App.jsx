import React from 'react';

import { getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import './App.scss';
import './styles/general.scss';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedTodoId: 0,
    status: 'All',
    query: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos: todos.filter(todo => todo.title && todo.userId && todo.id),
    });
  }

  selectedUser = (userId, todoId) => {
    this.setState({
      selectedUserId: userId,
      selectedTodoId: todoId,
    });
  }

  changeStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === +id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return { ...todo };
      }),
    }));
  }

  handleSelect = ({ target }) => {
    this.setState({ status: target.value });
  }

  handleChange = ({ target }) => {
    this.setState({ query: target.value.toLowerCase() });
  }
  

  selectButton = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId, selectedTodoId, status, query } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedTodoId={selectedTodoId}
            status={status}
            query={query}
            selectedUser={this.selectedUser}
            changeStatus={this.changeStatus}
            handleSelect={this.handleSelect}
            handleChange={this.handleChange}
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
