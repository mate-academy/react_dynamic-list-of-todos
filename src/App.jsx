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
    titleSearch: '',
    todosStatus: 'All',
  };

  componentDidMount() {
    request('/todos')
      .then(({ data }) => 
        this.setState({ todos: [...data] })
      );
  }

  selectUser = (userId) => {
    if (this.state.selectedUserId !== userId) {
      this.setState({ selectedUserId: userId });
    }
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  titleSearchChangeHandler = ({ name, value }) => {
    this.setState({ [name]: value });
  }

  setTodosStatus = (status) => {
    this.setState({ todosStatus: status });
  }

  prepareTodos = () => {
    const { todos, titleSearch, todosStatus } = this.state;

    let visibleTodos = [...todos];

    if (todosStatus === 'Active') {
      visibleTodos = [...todos].filter(({ completed }) => !completed);
    }

    if (todosStatus === 'Completed') {
      visibleTodos = [...todos].filter(({ completed }) => completed);
    }

    if (titleSearch.trim()) {
      visibleTodos = [...visibleTodos].filter(todo => (
        (`${todo.title}`).toLowerCase().includes(titleSearch.toLowerCase())
      ));
    }

    return visibleTodos;
  }

  render() {
    const { titleSearch, selectedUserId } = this.state;
    const visibleTodos = this.prepareTodos();

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={visibleTodos}
            onUserSelect={this.selectUser}
            selectedUser={selectedUserId}
            titleSearch={titleSearch}
            titleSearchChangeHandler={this.titleSearchChangeHandler}
            setTodosStatus={this.setTodosStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
