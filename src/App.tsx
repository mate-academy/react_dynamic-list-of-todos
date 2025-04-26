import React, { Component } from 'react';
import { getTodos, getUserDetails, wait } from './api/api';
import { Todo } from './api/types';
import TodoList from './components/TodoList';
import Loader from './components/Loader';
import TodoFilter from './components/TodoFilter';
import TodoModal from './components/TodoModal';

interface AppState {
  todos: Todo[];
  visibleTodos: Todo[];
  selectedTodo: Todo | null;
  isLoading: boolean;
  query: string;
  filterBy: 'all' | 'completed' | 'active';
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      todos: [],
      visibleTodos: [],
      selectedTodo: null,
      isLoading: false,
      query: '',
      filterBy: 'all',
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await wait(1000); // Simulate server delay
    const todos = await getTodos();
    this.setState({
      todos,
      visibleTodos: todos,
      isLoading: false,
    });
  }

  handleQueryChange = (query: string) => {
    const filteredTodos = this.state.todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ query, visibleTodos: filteredTodos });
  };

  clearQuery = () => {
    this.setState({ query: '', visibleTodos: this.state.todos });
  };

  handleFilterChange = (filterBy: 'all' | 'completed' | 'active') => {
    const filteredTodos = this.state.todos.filter(todo => {
      if (filterBy === 'completed') return todo.completed;
      if (filterBy === 'active') return !todo.completed;
      return true;
    });
    this.setState({ filterBy, visibleTodos: filteredTodos });
  };

  openModal = async (todo: Todo) => {
    this.setState({ isLoading: true });
    const user = await getUserDetails(todo.userId);
    this.setState({ selectedTodo: { ...todo, user }, isLoading: false });
  };

  closeModal = () => {
    this.setState({ selectedTodo: null });
  };

  render() {
    const { visibleTodos, isLoading, selectedTodo, query, filterBy } = this.state;

    return (
      <div>
        <h1>Todo List</h1>
        {isLoading && <Loader />}
        <TodoFilter
          query={query}
          filterBy={filterBy}
          onQueryChange={this.handleQueryChange}
          onFilterChange={this.handleFilterChange}
          onClearQuery={this.clearQuery}
        />
        <TodoList todos={visibleTodos} onShow={this.openModal} />
        {selectedTodo && <TodoModal todo={selectedTodo} onClose={this.closeModal} />}
      </div>
    );
  }
}

export default App;
