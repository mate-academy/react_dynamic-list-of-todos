import React, { ChangeEvent } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

interface State {
  selectedUserId: number;
  todos: Todo[],
  title: string,
  select: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    title: '',
    select: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  selectUser = (userId: number) => {
    this.setState({
      selectedUserId: userId,
    });
  };

  clearUserId = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState(prevState => ({
      ...prevState,
      select: event.target.value,
    }));
  };

  filterTodos = (a: Todo[]) => {
    return a.filter(todo => (
      todo.title.toLowerCase().includes(this.state.title.toLowerCase())
    ));
  };

  readyTodos = () => {
    const { select, todos } = this.state;

    switch (select) {
      case 'all':
        return this.filterTodos(todos);

      case 'completed':
        return this.filterTodos(todos.filter(todo => todo.completed));

      case 'active':
        return this.filterTodos(todos.filter(todo => !todo.completed));

      default:
        throw new Error('Error');
    }
  };

  render() {
    const { selectedUserId, title, todos } = this.state;

    if (!todos) {
      return '';
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.readyTodos()}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            title={title}
            handleInputChange={this.handleInputChange}
            handleSelectChange={this.handleSelectChange}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} />
            ) : 'No user selected'}
          </div>

          {!!selectedUserId && (
            <button
              type="button"
              className=""
              onClick={this.clearUserId}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
