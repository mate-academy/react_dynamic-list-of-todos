import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos, updateCheckTodo, getSelectTodos } from './api/api';

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
      || this.state.todos !== prevState.todos) {
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

  loadCheckTodo = async (isChecked: boolean) => {
    getSelectTodos(isChecked)
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
    await updateCheckTodo(id, isChecked);
    this.updateTodos(this.state.selectFilterValue);
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

    this.updateTodos(value);

    this.setState({
      selectFilterValue: value,
    });
  };

  updateTodos = (value: string) => {
    switch (value) {
      case 'active':
        this.loadCheckTodo(true);
        break;
      case 'complated':
        this.loadCheckTodo(false);
        break;
      default:
        this.loadAllTodos();
    }
  };

  filterTodos = () => {
    this.setState(state => ({
      visibleTodos: state.todos.filter(todo => (todo.title.includes(state.inputFilterValue))),
    }));
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
          <TodoList
            todos={visibleTodos}
            selectUsersbyId={this.selectUsersbyId}
            selectedUserId={selectedUserId}
            setCheckTodo={this.setCheckTodo}
            inputFilterValue={inputFilterValue}
            hendlerFilterInput={this.hendlerFilterInput}
            selectFilterValue={selectFilterValue}
            hendlerFilterSelect={this.hendlerFilterSelect}
            randomSortTodos={this.randomSortTodos}
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
