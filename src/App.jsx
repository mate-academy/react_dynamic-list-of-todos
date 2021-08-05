import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    query: '',
    isRandomTodo: false,
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({ todos });
      });
  }

  showSelectedTodo = (event) => {
    const { value } = event.target;
    let status;

    if (value === 'true') {
      status = true;
    }

    if (value === 'false') {
      status = false;
    }

    if (value === 'all') {
      status = value;
    }

    getTodos()
      .then((todos) => {
        this.setState({
          todos: todos.filter(todo => (
            status === 'all'
              ? todo
              : todo.completed === status
          )),
        });
      });
  }

  randomTodo = () => {
    this.setState(state => ({
      isRandomTodo: !state.isRandomTodo,
    }));
  };

  selectedUser = (selectedUserId) => {
    this.setState({ selectedUserId });
  }

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      todos,
      selectedUserId,
      query,
      isRandomTodo,
    } = this.state;

    const {
      selectedUser,
      handleChange,
      showSelectedTodo,
      randomTodo,
      clearSelectedUser,
    } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            query={query}
            randomTodo={randomTodo}
            isRandomTodo={isRandomTodo}
            handleChange={handleChange}
            selectedUserId={selectedUser}
            showSelectedTodo={showSelectedTodo}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClear={clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
