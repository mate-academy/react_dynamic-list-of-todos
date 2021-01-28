import React from 'react';
import './App.scss';
import './styles/general.scss';
import { CurrentUser } from './components/CurrentUser';
import { TodoList } from './components/TodoList';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    query: '',
    status: '',
    isRandom: false,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos: todos.data });
  }

  selectUser = (selectedUserId) => {
    this.setState({ selectedUserId });
  }

  onSearchChange = (e) => {
    const { value } = e.target;

    this.setState({ query: value.toLowerCase() });
  }

  onSelectChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  onCheckChange = (todoId) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos.map(todo => (todo.id === todoId
          ? {
            ...todo, completed: !todo.completed,
          }
          : todo)),
      ],
    }));
  }

  onRandomize = () => {
    this.setState(prevState => ({
      isRandom: !prevState.isRandom,
    }));
  }

  render() {
    const {
      isRandom,
      todos,
      selectedUserId,
      query,
      status,
    } = this.state;

    let todosOnPage = todos
      .filter(todo => todo
        && todo.title
        && todo.title.includes(query));

    if (status === 'active') {
      todosOnPage = todosOnPage.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      todosOnPage = todosOnPage.filter(todo => todo.completed);
    }

    if (isRandom) {
      todosOnPage.sort(() => Math.random() - 0.5);
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            randomize={this.onRandomize}
            todos={todosOnPage}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            searchTodos={this.onSearchChange}
            filterTodos={this.onSelectChange}
            searchValue={query}
            status={status}
            checkTodo={this.onCheckChange}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId !== 0 ? (
              <CurrentUser userId={selectedUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
