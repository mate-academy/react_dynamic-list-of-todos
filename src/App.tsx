import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import React from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

interface State {
  todos: Todo[];
  filteredTodos: Todo[];
  loading: boolean;
  todoId: number | string;
  query: string;
}

export class App extends React.Component<{}, State> {
  state:State = {
    todos: [],
    filteredTodos: [],
    loading: true,
    todoId: 0,
    query: '',
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        this.setState({ todos, filteredTodos: todos, loading: false });
      });
  }

  handleChangeAll = () => {
    this.setState(prevState => {
      return { filteredTodos: prevState.todos };
    });
  };

  handleChangeCompleted = () => {
    this.setState(prevState => {
      const completedTodos
      = prevState.todos.filter(todo => todo.completed);

      return { filteredTodos: completedTodos };
    });
  };

  handleChangeActive = () => {
    this.setState(prevState => {
      const active = prevState.todos.filter(todo => !todo.completed);

      return { filteredTodos: active };
    });
  };

  findQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    this.setState({ query });

    this.setState(prevState => {
      const filteredTodos
        = prevState.filteredTodos.filter(todo => todo.title.toLowerCase()
          .includes(query.toLowerCase().trim()));

      return { filteredTodos };
    });
  };

  resetQuery = () => {
    this.setState({ query: '' });
    this.handleChangeAll();
  };

  render() {
    const {
      filteredTodos,
      loading,
      todoId,
      query,
    } = this.state;

    return (
      <>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter
                  query={query}
                  findQuery={this.findQuery}
                  changeCompleted={this.handleChangeCompleted}
                  changeActive={this.handleChangeActive}
                  changeAll={this.handleChangeAll}
                  resetQuery={this.resetQuery}
                />
              </div>

              <div className="block">
                {loading ? <Loader /> : ''}
                <TodoList
                  todos={filteredTodos}
                  selectedTodoID={todoId}
                  selectTodo={(todoIDfromlist:number | string) => {
                    this.setState({ todoId: todoIDfromlist });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {!!todoId
           && (
             <TodoModal
               todos={filteredTodos}
               selectedTodoID={todoId}
               selectTodo={(todoIDfromlist:number | string) => {
                 this.setState({ todoId: todoIDfromlist });
               }}
             />
           )}
      </>
    );
  }
}
