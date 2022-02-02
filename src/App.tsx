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
    getTodos()
      .then(todosFromServer => {
        this.setState({
          todos: [...todosFromServer],
        });
      });
  }

  componentDidUpdate(prevState: State) {
    const { selectFilterValue } = this.state;

    if (prevState.selectFilterValue !== selectFilterValue) {
      this.filterTodos(selectFilterValue);
    }
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

  filterTodos = (filterValue: string) => {
    switch (filterValue) {
      case 'all':
        getTodos()
          .then(todos => {
            this.setState({
              todos: [...todos],
            });
          });
        break;

      case 'completed':
        getTodos()
          .then(todos => {
            this.setState({
              todos: [...todos].filter(todo => todo.completed),
            });
          });
        break;

      case 'notCompleted':
        getTodos()
          .then(todos => {
            this.setState({
              todos: [...todos].filter(todo => !todo.completed),
            });
          });
        break;

      default:
    }
  };

  render() {
    const {
      selectedUserId,
      todos,
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
            <option value="notCompleted">not completed</option>
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
            todos={todos}
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
