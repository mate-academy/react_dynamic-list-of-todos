import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import CurrentUser from './components/CurrentUser/CurrentUser';
import { httpRequest } from './components/api';
import TodoForm from './components/TodoForm/TodoForm';

class App extends React.Component {
  state = {
    todos: [],
    isSelected: false,
    selectedTodos: [],
    selectedUserId: null,
    inputValue: '',
  };

  initialTodos = [];

  componentDidMount() {
    httpRequest('todos')
      .then(todos => this.setState({
        initialTodos: todos.data
          .filter(todo => todo.title && todo.userId),
        todos: todos.data
          .filter(todo => todo.title && todo.userId),
      }));
  }

  getCurrentUserId = (currUserId) => {
    this.setState({
      selectedUserId: currUserId,
    });
  }

  onSelectHandler = (event) => {
    this.setState(
      {isSelected: true });
    const { initialTodos } = this.state;
    const statusType = event.target.value;
    if (statusType === 'completed') {
      this.setState({
        todos: initialTodos.filter(todo => todo.completed === true),
        selectedTodos: initialTodos.filter(todo => todo.completed === true),
        isSelected: true,
      });
    }

    if (statusType === 'active') {
      this.setState({
        todos: initialTodos.filter(todo => todo.completed === false),
        selectedTodos: initialTodos.filter(todo => todo.completed === false),
        isSelected: true,
      });
    }

    if (statusType === 'all') {
      this.setState({
        todos: [...initialTodos],
        isSelected: false,
      });
    }
  }

  clearUser = () => {
    this.setState({
      selectedUserId: null,
    });
  }

  onChangeHandler = (event) => {
    const { inputValue, initialTodos, isSelected, selectedTodos } = this.state;
    this.setState({ inputValue: event.target.value });
    const filteredTodos = (isSelected ? selectedTodos : initialTodos)
      .filter(todo => todo.title.includes(inputValue));

    this.setState({
      todos: filteredTodos,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoForm
            onChangeHandler={this.onChangeHandler}
            onSelectHandler={this.onSelectHandler}
            inputValue={this.state.inputValue}
          />
          <TodoList
            todos={todos}
            getCurrentUserId={this.getCurrentUserId}
            selectedUserId={this.state.selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={this.state.selectedUserId}
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
