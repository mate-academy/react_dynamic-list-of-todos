import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

interface State {
  selectedUserId: number;
  todos: Todo[],
  title: string,
  status: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    title: '',
    status: '',
  };

  async componentDidMount() {
    const todosFromServer = await getTodos();

    this.setState({ todos: [...todosFromServer] });
  }

  selectUser = (userId: number) => {
    if (this.state.selectedUserId !== userId) {
      this.setState({
        selectedUserId: userId,
      });
    }
  };

  changeStatus = (id: number) => {
    const todosCopy = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.setState(() => ({
      todos: todosCopy,
    }));
  };

  handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      status: event.target.value,
    });
  };

  preparedTodos = () => {
    const {
      todos,
      title,
      status,
    } = this.state;

    let todosCopy = [...todos];

    if (title) {
      todosCopy = todosCopy.filter(todo => todo.title.toLowerCase().includes(title.toLowerCase()));
    }

    switch (status) {
      case 'active':
        return todosCopy.filter(todo => !todo.completed);

      case 'complited':
        return todosCopy.filter(todo => todo.completed);

      default:
        return todosCopy;
    }
  };

  render() {
    const { selectedUserId, title, status } = this.state;
    const preparedTodos = this.preparedTodos();

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={preparedTodos}
            selectUser={this.selectUser}
            changeStatus={this.changeStatus}
            title={title}
            handleTitle={this.handleTitle}
            status={status}
            handleStatus={this.handleStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                selectUser={this.selectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
