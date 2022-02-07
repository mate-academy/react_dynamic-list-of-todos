import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import * as todosAPI from './api/todos';

interface State {
  query: string,
  todos: Todo[],
  selectedUserId: number;
  todoStatus: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    query: '',
    todos: [],
    selectedUserId: 0,
    todoStatus: 'all',
  };

  componentDidMount() {
    this.getAllTodos();
  }

  handleSelectByStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      todoStatus: value,
    });
  };

  getAllTodos = async () => {
    const todos = await todosAPI.getAllTodos();

    this.setState({ todos });
  };

  getSelectedUser = (selectedUserId: number) => {
    this.setState({ selectedUserId });
  };

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  queryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      query: value,
    });
  };

  filterTodos() {
    const { todos, query, todoStatus } = this.state;
    const copyTodos = [...todos].filter((todo) => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    switch (todoStatus) {
      case 'all': {
        return copyTodos;
      }

      case 'finished': {
        return copyTodos.filter(todo => todo.completed === true);
      }

      case 'unfinished': {
        return copyTodos.filter(todo => todo.completed === false);
      }

      default: {
        return copyTodos;
      }
    }
  }

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            handleSelectByStatus={this.handleSelectByStatus}
            todoStatus={this.state.todoStatus}
            query={this.state.query}
            todos={this.filterTodos()}
            getSelectedUser={this.getSelectedUser}
            queryHandler={this.queryHandler}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                clearSelectedUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
