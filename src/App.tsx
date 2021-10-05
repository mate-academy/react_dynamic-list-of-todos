import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { getTodos } from './api/api';

interface State {
  todos: Todo[];
  selectedUserId: number;
  isActiveTodoId: number;
  filterQuery: string;
  showTodos: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    isActiveTodoId: 0,
    filterQuery: '',
    showTodos: 'all',
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        this.setState({ todos });
      });
  }

  onRandomizer = (event: React.MouseEvent) => {
    event.preventDefault();

    this.setState(prevState => ({
      todos: prevState.todos.sort(() => Math.random() - 0.5),
    }));
  };

  setFilterValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      filterQuery: target.value,
    });
  };

  setShowTodos = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      showTodos: target.value,
    });
  };

  setSelectedUserId = (event: React.MouseEvent, userId: number, id: number) => {
    event.preventDefault();

    this.setState({
      selectedUserId: userId,
      isActiveTodoId: id,
    });
  };

  setCompletedTodo = ({ target }: React.ChangeEvent<HTMLInputElement>, id: any) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: target.checked,
          };
        }

        return todo;
      }),
    }));
  };

  render() {
    const {
      todos,
      selectedUserId,
      isActiveTodoId,
      filterQuery,
      showTodos,
    } = this.state;

    let newTodos;

    switch (showTodos) {
      case 'active':
        newTodos = todos.filter(({ completed }) => !completed);
        break;

      case 'completed':
        newTodos = todos.filter(({ completed }) => completed);
        break;

      default:
        newTodos = todos;
        break;
    }

    const visualizedTodos = newTodos
      .filter(({ title }) => title?.toLowerCase()
        .includes(filterQuery.toLowerCase()));

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={visualizedTodos}
            activeTodoId={isActiveTodoId}
            filterQuery={filterQuery}
            showTodos={showTodos}
            onRandomizer={this.onRandomizer}
            handleShowTodos={this.setShowTodos}
            handleFilterQuery={this.setFilterValue}
            handleClick={this.setSelectedUserId}
            handleChange={this.setCompletedTodo}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                handleClick={this.setSelectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
