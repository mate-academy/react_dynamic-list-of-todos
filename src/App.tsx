import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { SearchTodo } from './components/SearchTodo';
import { getAllTodos } from './api/api';

type State = {
  selectedUserId: number,
  todos: Todo[],
  filteredTodo: Todo[],
  query: string,
  todoStatus: 'all' | 'active' | 'completed',
};

type Props = {};

export class App extends React.Component<Props, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    filteredTodo: [],
    query: '',
    todoStatus: 'all',
  };

  componentDidMount = async () => {
    const todos = await getAllTodos();

    this.setState({
      todos,
      filteredTodo: todos,
    });
  };

  changeHandler = async (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    const newState = { [name]: value } as Pick<State, 'query' | 'todoStatus'>;

    await this.setState(newState);
    this.loadData();
  };

  randomaizer = () => {
    this.setState((prevState) => ({
      filteredTodo: [...prevState.filteredTodo].sort(() => Math.random() - 0.5),
    }));
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  selectUser = (userId: number) => {
    if (this.state.selectedUserId !== userId) {
      this.setState({ selectedUserId: userId });
    }
  };

  filteredTodo = (status: boolean) => {
    const { todos } = this.state;
    const result = [...todos.filter(todo => todo.completed === status)];

    return result;
  };

  async loadData() {
    const { todoStatus, todos } = this.state;
    let newTodos;

    switch (todoStatus) {
      case 'active':
        newTodos = this.filteredTodo(true);
        break;
      case 'completed':
        newTodos = this.filteredTodo(false);
        break;
      default:
        newTodos = [...todos];
        break;
    }

    this.setState({
      filteredTodo: newTodos,
    });
  }

  render() {
    const {
      selectedUserId,
      filteredTodo,
      todoStatus,
      query,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <SearchTodo
            changeHandler={this.changeHandler}
            query={query}
            todoStatus={todoStatus}
          />
          <TodoList
            todos={filteredTodo}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            query={query}
            randomaizer={this.randomaizer}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}
