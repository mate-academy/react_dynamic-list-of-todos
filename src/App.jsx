import React from 'react';
import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    titleSearch: '',
    todosStatus: 'All',
  };

  componentDidMount() {
    getTodos()
      .then(({ data }) => this.setState({ todos: [...data] }));
  }

  onSelectUserById = (userId) => {
    this.setState({ selectedUserId: userId });
  };

  onSearchByTitle = ({ value }) => {
    this.setState({ titleSearch: value });
  };

  onSetTodosStatus = (status) => {
    this.setState({ todosStatus: status });
  };

  onClearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  prepareTodos = () => {
    const { todos, titleSearch, todosStatus } = this.state;

    let visibleTodos = [...todos];

    if (todosStatus === 'Active') {
      visibleTodos = [...todos].filter(({ completed }) => !completed);
    }

    if (todosStatus === 'Completed') {
      visibleTodos = [...todos].filter(({ completed }) => completed);
    }

    if (titleSearch) {
      visibleTodos = [...visibleTodos].filter(todo => (
        (`${todo.title}`).toLowerCase().includes(titleSearch.toLowerCase())
      ));
    }

    return visibleTodos;
  };

  render() {
    const { titleSearch, selectedUserId } = this.state;
    const visibleTodos = this.prepareTodos();

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={visibleTodos}
            selectedUserId={selectedUserId}
            titleSearch={titleSearch}
            onSearchByTitle={this.onSearchByTitle}
            onSelectUserById={this.onSelectUserById}
            onSetTodosStatus={this.onSetTodosStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClearUser={this.onClearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
