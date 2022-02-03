import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, filterTodos } from './api/api';

type Props = {};
type State = {
  todos: Todo[];
  selectedUserId: number;
  selectedFilter: string;
  query: string;
};

export class App extends React.Component<Props, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    selectedFilter: 'all',
    query: '',
  };

  async componentDidMount() {
    const todosFromServer = await getTodos();

    this.setState({ todos: [...todosFromServer] });
  }

  componentDidUpdate = (_: Props, prevState: State) => {
    if (prevState.selectedFilter !== this.state.selectedFilter) {
      switch (this.state.selectedFilter) {
        case 'active':
          filterTodos(false)
            .then(todos => {
              this.setState({ todos: [...todos] });
            });
          break;

        case 'completed':
          filterTodos(true)
            .then(todos => {
              this.setState({ todos: [...todos] });
            });
          break;

        default:
          this.componentDidMount();
      }
    }
  };

  changeTodoStatus = (id: number) => {
    const todosChanged = this.state.todos.map(todo => {
      if (+todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.setState(() => ({
      todos: todosChanged,
    }));
  };

  setFilterByStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedFilter: event.target.value });
  };

  setFilterByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  getVisibleTodos = () => {
    const { query, todos } = this.state;
    const lowerCaseQuery = query.toLocaleLowerCase();

    return todos.filter(todo => todo.title.includes(lowerCaseQuery));
  };

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clearUserInfo = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const {
      selectedUserId,
      selectedFilter,
      query,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <form className="app__form">
            <p>Find todo</p>
            <input
              className="input is-info"
              placeholder="Enter todo title"
              type="text"
              value={query}
              onChange={this.setFilterByTitle}
            />

            <p>Select todo status</p>
            <div className="select is-info">
              <select
                name="todoStatus"
                value={selectedFilter}
                onChange={this.setFilterByStatus}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </form>

          <TodoList
            todos={this.getVisibleTodos()}
            changeTodoStatus={this.changeTodoStatus}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUserInfo={this.clearUserInfo}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
