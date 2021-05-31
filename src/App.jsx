import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAll } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    todoID: 0,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const prepearedTodos = await getAll('todos');

    this.setState({
      todos: prepearedTodos.data,
    });
  }

  onUserSelected = (userId, todoID) => {
    this.setState({
      selectedUserId: userId,
      todoID,
    });
  }

  clearUserSelection = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  // filterTodosByTitle = ({ target }) => {
  //   const { todos } = this.state;
  //   const filtered = todos
  //     .filter(todo => todo.title && todo.title.includes(target.value));

  //   this.setState({
  //     todos: filtered,
  //   });
  // }

  render() {
    const { todos, selectedUserId, todoID } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            todoID={todoID}
            onUserSelected={this.onUserSelected}
            filterTodosByTitle={this.filterTodosByTitle}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUserSelection={this.clearUserSelection}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
