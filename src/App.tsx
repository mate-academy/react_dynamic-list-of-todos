import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos, getUser } from './api';

import { Todo } from './types/Todo';
import { User } from './types/User';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

type State = {
  todosFromServer: Todo[],
  user: User | null,
  currentTodo: Todo | null,
  isDataReady: boolean,
  isClickedOnTodos: boolean,
  query: string,
  option: string,
};

export class App extends React.Component {
  state: Readonly<State> = {
    todosFromServer: [],
    user: null,
    currentTodo: null,
    isDataReady: false,
    isClickedOnTodos: false,
    query: '',
    option: 'all',
  };

  componentDidMount(): void {
    this.loadTodos();
  }

  onTodoBtnClick = (userId: number, todo:Todo) => {
    this.setState({
      isClickedOnTodos: true,
      isDataReady: false,
      currentTodo: todo,
    });

    this.loadUserInfo(userId);
  };

  closeModal = () => {
    this.setState({
      isClickedOnTodos: false,
      user: null,
      currentTodo: null,
    });
  };

  selectedTodos = (option: string) => {
    this.setState({ option });
  };

  filterByQuery = (query:string) => {
    this.setState({ query });
  };

  visibleTodos = () => {
    const {
      todosFromServer, option, query,
    } = this.state;
    let selectedTodos:Todo[] = todosFromServer;

    const filteredTodos: Todo[] = selectedTodos.filter((todo: Todo) => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });

    switch (option) {
      case 'active':
        selectedTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        selectedTodos = filteredTodos.filter(todo => todo.completed);
        break;
      case 'all':
        selectedTodos = filteredTodos;
        break;
      default:
        selectedTodos = filteredTodos;
    }

    return selectedTodos;
  };

  clearQuery = () => {
    this.setState({
      query: '',
    });
  };

  loadUserInfo = async (userId:number) => {
    const userFromServer = await getUser(userId);

    this.setState({
      user: userFromServer,
      isDataReady: true,
    });
  };

  loadTodos = async () => {
    const todosFromServer = await getTodos();

    this.setState({
      todosFromServer,
      isDataReady: true,
    });
  };

  render() {
    const {
      isDataReady, isClickedOnTodos, user, query, currentTodo,
    } = this.state;
    const todosToRender = this.visibleTodos();

    return (
      <>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter
                  onSelectedOption={this.selectedTodos}
                  onInputChange={this.filterByQuery}
                  inputValue={query}
                  onClearQuery={this.clearQuery}
                />
              </div>

              <div className="block">
                {!isDataReady && <Loader />}
                <TodoList
                  todos={todosToRender}
                  selectedTodo={currentTodo}
                  clickHandler={this.onTodoBtnClick}
                />
              </div>
            </div>
          </div>
        </div>

        {(!isDataReady || isClickedOnTodos)
          && (
            <TodoModal
              user={user}
              todo={currentTodo}
              onCloseBtn={this.closeModal}
            />
          )}
      </>
    );
  }
}
