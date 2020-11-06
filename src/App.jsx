import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/users';

class App extends React.Component {
  state = {
    todos: [],
    initialTodos: [],
    selectedUserId: 0,
    inputValue: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos: todos.data,
      initialTodos: todos.data,
    });
  }

  handleUser = (event) => {
    this.setState({
      selectedUserId: event.target.value,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  changeHandler = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  filteredTodos = () => {
    const { todos, inputValue } = this.state;

    return todos.filter(({ title }) => title.includes(inputValue));
  }

  handleSelectChange = (event) => {
    const { value } = event.currentTarget;

    switch (value) {
      case 'active':
        this.filterByBoolean(false);
        break;
      case 'completed':
        this.filterByBoolean(true);
        break;
      default:
        this.setState(state => ({
          todos: [...state.initialTodos],
        }));
        break;
    }
  }

  filterByBoolean(bool) {
    const { initialTodos } = this.state;

    this.setState({
      todos: [...initialTodos].filter(({ completed }) => completed === bool),
    });
  }

  render() {
    const { selectedUserId, inputValue } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.filteredTodos()}
            handleUser={this.handleUser}
            search={this.changeHandler}
            query={inputValue}
            handleSelect={this.handleSelectChange}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                clearUser={this.clearUser}
                userId={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
