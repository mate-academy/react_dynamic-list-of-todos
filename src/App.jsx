import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    value: '',
    status: 'all',
  };

  componentDidMount() {
    request('/todos')
      .then((todos) => {
        this.setState({
          todos,
        });
      });
  }

  filterByTitle = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  filterByCompleteStatus = (event) => {
    this.setState({
      status: event.target.value,
    });
  }

  filterTodos = (todos) => {
    const { value, status } = this.state;
    let result = [...todos];

    if (status === 'completed') {
      result = todos.filter(todo => todo.completed);
    }

    if (status === 'in process') {
      result = todos.filter(todo => !todo.completed);
    }

    if (value !== '') {
      result = result.filter(todo => todo.title
        && todo.title.includes(value));
    }

    return result;
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId, status, value } = this.state;
    const {
      clearUser,
      filterByCompleteStatus,
      filterByTitle,
      filterTodos,
    } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filterTodos(todos)}
            status={status}
            value={value}
            filterByCompleteStatus={filterByCompleteStatus}
            filterByTitle={filterByTitle}
            selectedUserId={selectedUserId}
            onUserIdSelected={(userId) => {
              this.setState({ selectedUserId: userId });
            }}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClick={clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
