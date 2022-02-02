import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { SearchForm } from './components/SearchForm/SearchForm';
import { TodoStatus } from './types/TodoStatus';

type State = {
  selectedUserId: number,
  todos: Todo[],
  query: string,
  todoStatus: TodoStatus,
};

type Props = {};

class App extends React.Component<Props, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    query: '',
    todoStatus: TodoStatus.All,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos,
    });
  }

  async componentDidUpdate(_prevProps: Props, prevState: State) {
    if (this.state.query !== prevState.query
      || this.state.todoStatus !== prevState.todoStatus) {
      await this.filterTodos();
    }
  }

  checkTodo = (todoId: number) => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));
  };

  selectUser = (selectedUserId = 0) => {
    this.setState({ selectedUserId });
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, 'query' | 'todoStatus'>);
  };

  filterTodos = async () => {
    const { query } = this.state;
    const todos = await this.filterTodosByStatus();

    this.setState({
      todos: todos.filter(todo => todo.title.includes(query)),
    });
  };

  filterTodosByStatus = async (): Promise<Todo[]> => {
    const { todoStatus } = this.state;

    switch (todoStatus) {
      case TodoStatus.Active:
        return getTodos(false);
      case TodoStatus.Completed:
        return getTodos(true);
      default:
        return getTodos();
    }
  };

  render() {
    const {
      selectedUserId,
      todos,
      query,
      todoStatus,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <SearchForm
            query={query}
            todoStatus={todoStatus}
            onChange={this.changeHandler}
          />

          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            onCheck={this.checkTodo}
            onSelectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onClear={this.selectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
