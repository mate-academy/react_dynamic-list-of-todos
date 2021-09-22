import React from 'react';
import 'bulma';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getUsers } from './api';
import { Filters } from './components/Filters';

interface State {
  todos: Todo[];
  filteredTodos: Todo[];
  selectedUserId: number;
  filterType: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    filteredTodos: [],
    selectedUserId: 0,
    filterType: 'all',
  };

  async componentDidMount() {
    const todos = await getUsers('todos?limit=20');

    this.setState({
      todos,
      filteredTodos: todos,
    });
  }

  handleUserSelection = (userId: number) => {
    this.setState({
      selectedUserId: userId,
    });
  };

  handleUserCleaning = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  filterTodosByTitle = (title: string) => {
    if (this.state.filterType === 'all') {
      this.setState(currentState => ({
        filteredTodos: [...currentState.todos].filter(todo => todo.title.includes(title)),
      }));
    }

    if (this.state.filterType === 'completed') {
      this.setState(currentState => ({
        filteredTodos: [...currentState.todos]
          .filter(todo => todo.title.includes(title) && (todo.completed)),
      }));
    }

    if (this.state.filterType === 'active') {
      this.setState(currentState => ({
        filteredTodos: [...currentState.todos]
          .filter(todo => todo.title.includes(title) && (!todo.completed)),
      }));
    }
  };

  filterTodosByStatus = (todoStatus: string, title: string) => {
    switch (todoStatus) {
      case 'completed':
        this.setState(currentState => {
          const filtered = currentState.todos
            .filter(todo => todo.completed && todo.title.includes(title));

          return ({
            filteredTodos: filtered,
            filterType: 'completed',
          });
        });
        break;

      case 'active':
        this.setState(currentState => ({
          filteredTodos: [...currentState.todos]
            .filter(todo => !todo.completed && todo.title.includes(title)),
          filterType: 'active',
        }));
        break;

      default:
        this.setState(currentState => ({
          filteredTodos: currentState.todos,
          filterType: 'all',
        }));
    }
  };

  render() {
    const { selectedUserId, filteredTodos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <h2>Todos:</h2>
          <Filters
            filterTodosByTitle={this.filterTodosByTitle}
            filterTodosByStatus={this.filterTodosByStatus}
          />
          <TodoList
            todos={filteredTodos}
            handleUserSelection={this.handleUserSelection}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} onCleanButton={this.handleUserCleaning} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
