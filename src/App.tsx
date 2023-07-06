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
  qwery: string;
}

export class App extends React.Component<{}, State> {
  state:State = {
    todos: [],
    filteredTodos: [],
    loading: true,
    todoId: 0,
    qwery: '',
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        this.setState({ todos, filteredTodos: todos, loading: false });
      });
  }

  handlechangeAll = () => {
    this.setState(prevState => {
      return { filteredTodos: prevState.todos };
    });
  };

  handlechangeCompleted = () => {
    this.setState(prevState => {
      const completedTodos
      = prevState.todos.filter(todo => todo.completed === true);

      return { filteredTodos: completedTodos };
    });
  };

  handlechangeActive = () => {
    this.setState(prevState => {
      const active = prevState.todos.filter(todo => todo.completed === false);

      return { filteredTodos: active };
    });
  };

  findQwery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const qwery = event.target.value;

    this.setState({ qwery });

    this.setState(prevState => {
      const filteredTodos
        = prevState.filteredTodos.filter(todo => todo.title.toLowerCase()
          .includes(qwery.toLowerCase().trim()));

      return { filteredTodos };
    });
  };

  resetQwery = () => {
    this.setState({ qwery: '' });
    this.handlechangeAll();
  };

  render() {
    const {
      filteredTodos,
      loading,
      todoId,
      qwery,
    } = this.state;

    return (
      <>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter
                  qwery={qwery}
                  findQwery={this.findQwery}
                  changeCompleted={this.handlechangeCompleted}
                  changeActive={this.handlechangeActive}
                  changeAll={this.handlechangeAll}
                  resetQwery={this.resetQwery}
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

        {todoId !== 0
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
