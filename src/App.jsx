import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from "./api/api";


class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    inputSearchValue: '',
    todosStatus: 'All',
  };

  componentDidMount() {
    request('/todos')
      .then(({ data }) =>
        this.setState({ todos: [...data] })
      );
  }

  selectUser = (userId) => {
    if(this.state.selectedUserId !== userId) {
      this.setState({
        selectedUserId: userId,
      })}
  }

  filterTodosByTitle = ({ name, value }) => {
    this.setState({ [name]: value });
  }

  setTodosStatus = (status) => {
    this.setState({ todosStatus: status });
  }

  prepareTodos = () => {
    const { todos, inputSearchValue, todosStatus } = this.state;

    let visibleTodos = [...todos];

    if (todosStatus === 'active') {
      visibleTodos = [...todos].filter(({ completed }) => !completed);
    }

    if (todosStatus === 'completed') {
      visibleTodos = [...todos].filter(({ completed }) => completed);
    }

    if (inputSearchValue.trim()) {
      visibleTodos = [...visibleTodos].filter(todo => (
        (`${todo.title}`).toLowerCase().includes(inputSearchValue.toLowerCase())
      ));
    }

    return visibleTodos;
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    })
  }

  render() {
    const { inputSearchValue, selectedUserId } = this.state;
    const visibleTodos = this.prepareTodos();

    return (
      <div className="App">
        <div className="App__sidebar">
          <h2>Todos:</h2>
          <input
            type="text"
            id="title-filter"
            name="inputSearchValue"
            value={inputSearchValue}
            onChange={({ target }) => this.filterTodosByTitle(target)}
          />
          <select
            onChange={event => this.setTodosStatus(event.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <TodoList
            todos={visibleTodos}
            selectUser={this.selectUser}
            selectedUser={selectedUserId}
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
