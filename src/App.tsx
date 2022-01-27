import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/API/api';

interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  selectedUserId: number,
}

type State = {
  selectedUserId: number;
  todos: Todo[],
  inputFilter: string,
  sortType: string,
};

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    inputFilter: '',
    sortType: '',
  };

  componentDidMount() {
    this.showAllTodos();
  }

  selectUser = (userId: number) => {
    this.setState({
      selectedUserId: userId,
    });
  };

  filterByTitle = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    getTodos().then(todos => {
      this.setState({
        todos: todos.filter((todo: Todo) => todo.title.includes(value)),
        inputFilter: value,
      });
    });
  };

  selectHandler = (type: string) => {
    this.setState({
      sortType: type,
    });
    switch (type) {
      case 'all':
        this.showAllTodos();
        break;
      case 'active':
        this.toggleCompleted('active');
        break;
      case 'completed':
        this.toggleCompleted('completed');
        break;
      default:
        break;
    }
  };

  showAllTodos = () => {
    getTodos().then(todos => {
      this.setState({ todos });
    });
  };

  toggleCompleted = (state: string) => {
    getTodos().then(todos => {
      this.setState({
        todos: todos.filter((todo: Todo) => (
          state === 'completed' ? todo.completed : !todo.completed
        )),
      });
    });
  };

  randomize = () => {
    getTodos().then(todos => {
      this.setState({
        todos: todos.sort(() => 0.5 - Math.random()),
      });
    });
  };

  render() {
    const {
      selectedUserId,
      todos,
      inputFilter,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <h2>Todos:</h2>
          <div className="App__sort-container">
            <label htmlFor="input__filter">
              Sort todo&apos;s by title:
              <input
                id="input__filter"
                type="text"
                className="App__input-sort"
                value={inputFilter}
                onChange={this.filterByTitle}
              />
            </label>
            <label htmlFor="input__select">
              Sort todo&apos;s by title:
              <select
                name="select"
                id="input__select"
                className="App__input-sort"
                value={this.state.sortType}
                onChange={(event) => this.selectHandler(event.currentTarget.value)}
              >
                <option
                  value="all"
                >
                  all
                </option>
                <option
                  value="active"
                >
                  active
                </option>
                <option
                  value="completed"
                >
                  completed
                </option>
              </select>
            </label>
            <button
              type="button"
              className="App__button-randomize"
              onClick={this.randomize}
            >
              Randomize
            </button>
          </div>
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                resetUser={() => {
                  this.selectUser(0);
                }}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
