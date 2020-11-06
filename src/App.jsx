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

    const filterTodos = todos.data.filter(todo => todo.title && todo.id);

    this.setState({
      todos: filterTodos,
      initialTodos: filterTodos,
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
        this.filterByStatus(false);
        break;
      case 'completed':
        this.filterByStatus(true);
        break;
      default:
        this.setState(state => ({
          todos: [...state.initialTodos],
        }));
        break;
    }
  }

  filterByStatus(bool) {
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
            search={this.changeHandler}
            query={inputValue}
            handleSelect={this.handleSelectChange}
            todos={this.filteredTodos()}
            handleUser={this.handleUser}
            selectedUserId={selectedUserId}
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
