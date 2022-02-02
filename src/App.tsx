import React from 'react';

import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './Api/api';

interface State {
  todos: Todo[];
  selectedUserId: number;
  query: string;
  selectorStatus: number;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    query: '',
    todos: [],
    selectorStatus: 0,
  };

  async componentDidMount() {
    const todos = await getAllTodos();

    this.setState({ todos });
  }

  getSelectedUserId = (id: number) => {
    this.setState((
      { selectedUserId: id }
    ));
  };

  handleButtonFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value,
    });
  };

  getFilteredData = () => {
    const { todos, query, selectorStatus } = this.state;

    if (query) {
      const filterTodos = todos.filter((todo) => {
        const lowerCaseQuery = query.toLowerCase();

        return (
          todo.title.toLowerCase().includes(lowerCaseQuery)
        );
      });

      return filterTodos;
    }

    switch (selectorStatus) {
      case 1:
        return todos.filter(todo => todo.completed === false);
      case 2:
        return todos.filter(todo => todo.completed === true);
      default:
        return todos;
    }
  };

  handleSelectorStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectorStatus: +event.target.value,
    });
  };

  handleRandomizer = () => {
    const { todos } = this.state;
    const randomOrder = todos.sort(() => Math.random() - 0.5);

    this.setState({ todos: randomOrder });
  };

  render() {
    const {
      selectedUserId,
      query,
      selectorStatus,
    } = this.state;
    const filteredTodoList = this.getFilteredData();

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredTodoList}
            selectedUserId={this.getSelectedUserId}
            handleButtonFilter={this.handleButtonFilter}
            query={query}
            handleSelectorStatus={this.handleSelectorStatus}
            selectorStatus={selectorStatus}
            randomizer={this.handleRandomizer}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                getSelectedUserId={this.getSelectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
