import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { GetTodo } from './api/api';

interface State {
  query: string;
  showOnly: string;
  todos: Todo[] | [];
  selectedUserId: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    query: '',
    showOnly: '',
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    GetTodo()
      .then((response) => {
        this.setState({ todos: response });
      });
  }

  handleChange = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    } as unknown as Pick<State, keyof State>);
  };

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  sortBy = (filterby: string) => {
    const filteredTodos = [...this.state.todos].filter(todo => (
      (todo.title.toLocaleLowerCase().includes(this.state.query.toLocaleLowerCase()))));

    switch (filterby) {
      case 'active':
        return filteredTodos.filter(todo => !todo.completed);

      case 'completed':
        return filteredTodos.filter(todo => todo.completed);

      case 'all':
        return filteredTodos;

      default:
        return filteredTodos;
    }
  };

  render() {
    const { selectedUserId, query, showOnly } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <div className="row align-items-start">
            <input
              type="text"
              name="query"
              placeholder="Search"
              value={query}
              className="form-control col"
              onChange={this.handleInput}
            />
            <select
              name="showOnly"
              className="form-select col"
              aria-label="Default select example"
              value={this.state.showOnly}
              onChange={this.handleInput}
            >
              <option value="" disabled>Show only</option>
              <option value="all">all</option>
              <option value="active">active</option>
              <option value="completed">completed</option>
            </select>
          </div>
          <TodoList
            todos={this.sortBy(showOnly)}
            handleChange={this.handleChange}
            userId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clearUser={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
