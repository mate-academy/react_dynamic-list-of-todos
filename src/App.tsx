import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos, UpdateCheckTodo } from './api/api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  visibleTodos: Todo[];
  inputFilterValue: string;
  selectFilterValue: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    visibleTodos: [],
    inputFilterValue: '',
    selectFilterValue: 'all',
  };

  componentDidMount() {
    this.loadAllTodos();
  }

  componentDidUpdate(_: any, prevState: State) {
    if (this.state.inputFilterValue !== prevState.inputFilterValue
      || this.state.selectFilterValue !== prevState.selectFilterValue) {
      this.filterTodos();
    }
  }

  loadAllTodos = () => {
    getAllTodos()
      .then(todos => {
        this.setState({
          todos: [...todos],
          visibleTodos: [...todos],
        });
      });
  };

  selectUsersbyId = (id: number) => {
    if (id !== this.state.selectedUserId) {
      this.setState({
        selectedUserId: id,
      });
    }
  };

  setCheckTodo = async (id: number, isChecked: boolean) => {
    await UpdateCheckTodo(id, isChecked);
    await getAllTodos()
      .then(todos => {
        this.setState({
          todos: [...todos],
        });
      });
    this.filterTodos();
  };

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  hendlerFilterInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      inputFilterValue: value,
    });
  };

  hendlerFilterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      selectFilterValue: value,
    });
  };

  filterTodos = () => {
    const { inputFilterValue, selectFilterValue, todos } = this.state;
    const visibleTodos = todos.filter(todo => {
      switch (selectFilterValue) {
        case 'active':
          return todo.title.includes(inputFilterValue) && !todo.completed;
        case 'complated':
          return todo.title.includes(inputFilterValue) && todo.completed;
        default:
          return todo.title.includes(inputFilterValue);
      }
    });

    this.setState({
      visibleTodos,
    });
  };

  randomSortTodos = () => {
    const random = Number((Math.random() * 20).toFixed(0));

    this.setState(state => ({
      visibleTodos: [...state.visibleTodos].sort((a, b) => {
        if (a.title[random] && b.title[random]) {
          return a.title[random].localeCompare(b.title[random]);
        }

        return -1;
      }),
    }));
  };

  render() {
    const {
      selectedUserId,
      visibleTodos,
      inputFilterValue,
      selectFilterValue,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <input
            type="text"
            name="titleFilter"
            className="input"
            placeholder="Search todo"
            value={inputFilterValue}
            onChange={this.hendlerFilterInput}
          />
          <select
            name="selectTodos"
            defaultValue={selectFilterValue}
            className="select"
            onChange={this.hendlerFilterSelect}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="complated">Complated</option>
          </select>

          <button
            type="button"
            className="button is-primary is-light"
            onClick={this.randomSortTodos}
          >
            Randomize
          </button>

          <TodoList
            todos={visibleTodos}
            selectUsersbyId={this.selectUsersbyId}
            selectedUserId={selectedUserId}
            setCheckTodo={this.setCheckTodo}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClearUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
