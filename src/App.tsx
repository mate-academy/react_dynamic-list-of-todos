import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  selectFilterValue: string;
  inputValue: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    selectFilterValue: '',
    inputValue: '',
  };

  componentDidMount() {
    this.loadTodos();
  }

  handelSelectUser = (userId: number) => {
    if (userId !== this.state.selectedUserId) {
      this.setState({
        selectedUserId: userId,
      });
    }
  };

  handelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      selectFilterValue: value,
    });
  };

  handleClear = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      inputValue: value,
    });
  };

  filterTodos = (): Todo[] => {
    const { todos, selectFilterValue, inputValue } = this.state;
    let filteredTodos;

    switch (selectFilterValue) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = [...todos];
    }

    return filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(inputValue.toLocaleLowerCase())
    ));
  };

  loadTodos() {
    getTodos()
      .then(todosFromServer => {
        this.setState({
          todos: [...todosFromServer],
        });
      });
  }

  render() {
    const {
      selectedUserId,
      selectFilterValue,
      inputValue,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <select
            value={selectFilterValue}
            onChange={this.handelSelect}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
          <br />
          <input
            onChange={this.handleChangeInput}
            value={inputValue}
            type="text"
          />
          <TodoList
            handelSelectUser={this.handelSelectUser}
            selectedUserId={selectedUserId}
            todos={this.filterTodos()}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                handleClear={this.handleClear}
                selectedUserId={selectedUserId}
                handelSelectUser={this.handelSelectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
