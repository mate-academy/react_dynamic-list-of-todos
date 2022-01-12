import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos, getUser } from './Api/api';

interface State {
  selectedUserId: number;
  todos: Todo[],
  user: User | null,
  filterBy: string,
  filterTitle: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    user: null,
    filterBy: 'all',
    filterTitle: '',
  };

  componentDidMount() {
    getAllTodos()
      .then(todos => {
        this.setState({
          todos,
        });
      });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
      user: null,
    });
  };

  selectUser = (id: number) => {
    if (id !== this.state.selectedUserId) {
      getUser(id)
        .then(user => {
          this.setState({
            user,
            selectedUserId: id,
          });
        });
    }
  };

  handlerChange = (event: { target: { name: string; value: string; }; }) => {
    const { name, value } = event.target;

    this.setState((state) => (
      {
        ...state,
        [name]: value,
      }
    ));
  };

  filterTodos = () => {
    let filterTodos = [...this.state.todos];

    if (this.state.filterBy === 'completed') {
      filterTodos = filterTodos.filter(todo => todo.completed === true);
    }

    if (this.state.filterBy === 'active') {
      filterTodos = filterTodos.filter(todo => todo.completed === false);
    }

    return filterTodos.filter(todo => {
      return todo.title.toLocaleLowerCase().includes(this.state.filterTitle.toLocaleLowerCase());
    });
  };

  render() {
    const { selectedUserId, user } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <div className="App__filter">
            <input
              type="text"
              name="filterTitle"
              className="App__input"
              onChange={this.handlerChange}
            />
            <select
              name="filterBy"
              id=""
              className="App__input"
              onChange={this.handlerChange}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
            </select>
          </div>
          <TodoList
            todos={this.filterTodos()}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId && user ? (
              <CurrentUser
                user={user}
                clear={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
