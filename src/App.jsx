import React from 'react';
import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos, getUser } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getAllTodos()
      .then((todos) => {
        const checkedTodos = todos.filter(todo => (
          todo.title && todo.id));

        this.setState({ todos: checkedTodos });
      });
  }

  selectUser = (id) => {
    this.setState({
      selectedUserId: id,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;
    const { selectUser } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length
            ? (
              <TodoList
                todos={todos}
                selectUser={selectUser}
                selectedUserId={selectedUserId}
              />
            )
            : (
              'Everything is done!'
            )
          }
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                getUser={getUser}
                selectUser={selectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
