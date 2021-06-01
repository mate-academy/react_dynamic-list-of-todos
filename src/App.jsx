import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    titleFilter: '',
    todosStatus: 'All',
  };

  componentDidMount() {
    request('/todos')
      .then(({ data }) => this.setState({ todos: [...data] }));
  }

  titleFilterChangeHandler = ({ name, value }) => {
    this.setState({ [name]: value });
  }

  setTodosStatus = (status) => {
    this.setState({ todosStatus: status });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  selectUser = (userId) => {
    this.setState((state) => {
      if (state.selectedUserId === userId) {
        return state;
      }

      return {
        ...state,
        selectedUserId: userId,
      };
    });
  }

  prepareTodos = () => {
    const { todos, titleFilter, todosStatus } = this.state;

    let visibleTodos = [...todos];

    if (todosStatus === 'Active') {
      visibleTodos = [...todos].filter(({ completed }) => completed === false);
    }

    if (todosStatus === 'Completed') {
      visibleTodos = [...todos].filter(({ completed }) => completed === true);
    }

    if (titleFilter.trim()) {
      visibleTodos = [...visibleTodos].filter(todo => (
        (`${todo.title}`).toLowerCase().includes(titleFilter.toLowerCase())
      ));
    }

    return visibleTodos;
  }

  render() {
    const { titleFilter, selectedUserId } = this.state;
    const visibleTodos = this.prepareTodos();

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={visibleTodos}
            selectedUser={selectedUserId}
            titleFilter={titleFilter}
            titleFilterChangeHandler={this.titleFilterChangeHandler}
            selectUser={this.selectUser}
            setTodosStatus={this.setTodosStatus}
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
