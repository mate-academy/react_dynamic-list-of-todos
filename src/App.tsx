import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos, getTodos } from './api/todos';

interface State {
  todos: Todo[],
  selectedUserId: number,
  query: string,
  selectedBy: string,
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    query: '',
    selectedBy: 'all',
  };

  async componentDidMount() {
    const todos = await getAllTodos();

    // eslint-disable-next-line no-console
    console.log(Object.keys(todos[0]));

    this.setState({
      todos,
    });
  }

  selectUserId = (userId: number) => {
    // eslint-disable-next-line no-console
    console.log('selectUserId', userId);

    this.setState({ selectedUserId: userId });
  };

  changeStatusTodo = (todoId: string) => {
    // eslint-disable-next-line no-console
    console.log(todoId);
    const todosChanged = this.state.todos.map(todo => {
      if (todo.id === todoId) {
        const currentData = Date();

        // eslint-disable-next-line no-console
        console.log(todo, currentData);

        return {
          ...todo,
          completed: !todo.completed,
          updatedAt: currentData,
        };
      }

      return todo;
    });

    this.setState(() => ({
      todos: todosChanged,
    }));
  };

  clearHandler = () => {
    // eslint-disable-next-line no-console
    console.log('clear');

    this.setState({ selectedUserId: 0 });
  };

  changeInput = (query: string) => {
    // eslint-disable-next-line no-console
    console.log(query);

    this.setState({ query });
  };

  selectHandler = async (selectBy: string) => {
    // eslint-disable-next-line no-console
    console.log('select changed');

    let addUrl = '';

    switch (selectBy) {
      case 'active':
        addUrl = '/todos?completed=false';
        break;

      case 'completed':
        addUrl = '/todos?completed=true';
        break;

      default:
        addUrl = '/todos';
    }

    // eslint-disable-next-line no-console
    console.log(addUrl);

    const todos = await getTodos(addUrl);

    this.setState({
      todos,
      selectedBy: selectBy,
    });
  };

  filterTodos = () => {
    const { query, todos, selectedBy } = this.state;

    // eslint-disable-next-line no-console
    console.log('selectedBy=', selectedBy, typeof selectedBy);

    if (query.length === 0) {
      return todos;
    }

    const queryToLowerCase: string = query.toLowerCase();

    return todos.filter(todo => todo.title.toLocaleLowerCase().includes(queryToLowerCase));
  };

  render() {
    const { selectedUserId, query, selectedBy } = this.state;
    const filteredTodos = this.filterTodos();

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredTodos}
            currentUserId={selectedUserId}
            selectUserId={this.selectUserId}
            changeStatusTodo={this.changeStatusTodo}
            query={query}
            changeInput={this.changeInput}
            selectedBy={selectedBy}
            selectHandler={this.selectHandler}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearHandler={this.clearHandler}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
