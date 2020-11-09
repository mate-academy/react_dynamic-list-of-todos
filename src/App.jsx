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
    this.setState({
      isSelected: true,
    });
    const { initialTodos } = this.state;
    const statusType = event.target.value;

    this.setState({
      todos: initialTodos
        .filter(todo => statusType === 'completed'
          ? todo.completed === true
          : statusType === 'active'
            ? todo.completed === false
            : todo),
      selectedTodos: initialTodos
        .filter(todo => statusType === 'completed'
          ? todo.completed === true
          : statusType === 'active'
            ? todo.completed === false
            : todo),
      isSelected: true,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: null,
    });
  }

  onChangeHandler = (event) => {
    const { inputValue, initialTodos, isSelected, selectedTodos } = this.state;
    const filteredTodos = (isSelected ? selectedTodos : initialTodos)
      .filter(todo => todo.title.includes(inputValue));

    this.setState({
      todos: filteredTodos,
      inputValue: event.target.value,
    });
  }

  render() {
    const { todos, selectedUserId, inputValue } = this.state;
    const {
      onChangeHandler,
      onSelectHandler,
      getCurrentUserId,
      clearUser,
    } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoForm
            onChangeHandler={onChangeHandler}
            onSelectHandler={onSelectHandler}
            inputValue={inputValue}
          />
          <TodoList
            todos={todos}
            getCurrentUserId={getCurrentUserId}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
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
