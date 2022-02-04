import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

type State = {
  todos: Todo[],
  selectedUserId: number,
  searchTitle: string,
  selectTodo: string,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    searchTitle: '',
    selectTodo: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos: [...todos],
    });
  }

  handleSearchTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTitle: event.target.value,
    });
  };

  handleSearchStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectTodo: event.target.value,
    });
  };

  getTodos = () => {
    const { searchTitle, todos, selectTodo } = this.state;

    const copyTodos = todos.filter(todo => todo.title.toLowerCase()
      .includes(searchTitle.toLowerCase()));

    if (selectTodo === 'active') {
      return copyTodos.filter(todo => !todo.completed);
    }

    if (selectTodo === 'completed') {
      return copyTodos.filter(todo => todo.completed);
    }

    return copyTodos;
  };

  selectedUser = (selectedUserId: number) => {
    this.setState({
      selectedUserId,
    });
  };

  removeUserInfo = () => {
    this.setState({ selectedUserId: 0 });
  };

  changeStatus = (userId: number) => {
    const { todos } = this.state;

    const newTodoStatus = todos.map(todo => {
      if (todo.id === userId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.setState({
      todos: newTodoStatus,
    });
  };

  render() {
    const getSelectedTodos = this.getTodos();

    const { selectedUserId, searchTitle, selectTodo } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={getSelectedTodos}
            handleSearchTitle={this.handleSearchTitle}
            searchTitle={searchTitle}
            selectedUser={this.selectedUser}
            handleSearchStatus={this.handleSearchStatus}
            changeStatus={this.changeStatus}
            selectTodo={selectTodo}

          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                removeUserInfo={this.removeUserInfo}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
