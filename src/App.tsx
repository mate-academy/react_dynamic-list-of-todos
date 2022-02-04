import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

interface State {
  todos: Todo[],
  selectedUserId: number;
  input: string,
  select: string,
}

export class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    input: '',
    select: '',
  };

  async componentDidMount() {
    const todosFromServer = await getTodos();

    this.setState({
      todos: todosFromServer,
    });
  }

  handleClear = () => {
    this.selectUser(0);
  };

  selectUser = (userId: number) => {
    this.setState({
      selectedUserId: userId,
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      input: value,
    });
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      select: value,
    });
  };

  getPreparedTodos = () => {
    const { todos, input, select } = this.state;
    const inputCase = input.toLowerCase();

    let preparedTodos = [...todos];

    if (input) {
      preparedTodos = todos.filter(todo => todo.title.toLowerCase().includes(inputCase));
    }

    switch (select) {
      case 'completed':
        return preparedTodos.filter(todo => todo.completed);
      case 'not':
        return preparedTodos.filter(todo => !todo.completed);
      default:
        return preparedTodos;
    }
  };

  render() {
    const {
      selectedUserId,
      select,
      input,
    } = this.state;

    const preparedTodos = this.getPreparedTodos();

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            select={select}
            handleChange={this.handleChange}
            input={input}
            todos={preparedTodos}
            selectUser={this.selectUser}
            handleSelectChange={this.handleSelectChange}
            userId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                removeUser={this.handleClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}
