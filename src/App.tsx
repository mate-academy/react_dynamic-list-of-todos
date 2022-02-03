import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

enum CompletionStatus {
  All = '',
  Completed = 'completed',
  Active = 'active',
}

interface State {
  selectedUserId: number;
  todos: Todo[],
  titleQuery: string,
  statusQuery: CompletionStatus,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    titleQuery: '',
    statusQuery: CompletionStatus.All,
  };

  async componentDidMount() {
    const todosFromServer = await getTodos();

    this.setState({
      todos: [...todosFromServer],
    });
  }

  handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ statusQuery: event.currentTarget.value as CompletionStatus });
  };

  handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ titleQuery: event.target.value });
  };

  changeTodoStatus = (id: number) => {
    const todoCopy = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.setState(() => ({
      todos: todoCopy,
    }));
  };

  selectUser = (userId: number) => {
    this.setState({
      selectedUserId: userId,
    });
  };

  clearUserSelection = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  getPreparedTodos = () => {
    const { todos, titleQuery, statusQuery } = this.state;
    const titleQueryToLowerCase = titleQuery.toLowerCase();
    let isCompletedStatus: boolean;

    switch (statusQuery) {
      case CompletionStatus.Active:
        isCompletedStatus = false;
        break;
      case CompletionStatus.Completed:
        isCompletedStatus = true;
        break;
      default:
        return todos.filter(todo => (
          todo.title.toLowerCase()
            .includes(titleQueryToLowerCase)
        ));
    }

    return todos.filter(todo => (
      todo.title.toLowerCase()
        .includes(titleQuery.toLowerCase())
        && (isCompletedStatus ? todo.completed : !todo.completed)
    ));
  };

  render() {
    const { selectedUserId, titleQuery, statusQuery } = this.state;
    const preparedTodos = this.getPreparedTodos();

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={preparedTodos}
            selectUser={this.selectUser}
            changeTodoStatus={this.changeTodoStatus}
            handleQuery={this.handleQuery}
            titleQuery={titleQuery}
            handleStatus={this.handleStatus}
            statusQuery={statusQuery}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearUserSelection}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
