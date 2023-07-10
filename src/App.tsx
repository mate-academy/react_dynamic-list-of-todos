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
  queryTodos: Todo[];
  loading: boolean;
  todoId: number | string;
  query: string;
  filter: string;
}

export class App extends React.Component<{}, State> {
  state:State = {
    todos: [],
    queryTodos: [],
    loading: true,
    todoId: 0,
    query: '',
    filter: '',
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        this.setState({
          todos,
          queryTodos: todos,
          loading: false,
        });
      });
  }

  handleChangeAll = () => {
    this.setState(prevState => {
      return {
        queryTodos: prevState.todos,
        filter: '',
      };
    });

    if (this.state.query) {
      this.setState(prevState => {
        const allQuery = prevState.todos.filter(todo => todo.title.toLowerCase()
          .includes(this.state.query.toLowerCase().trim()));

        return {
          queryTodos: allQuery,
          filter: '',
        };
      });
    }
  };

  handleChangeCompleted = () => {
    this.setState(prevState => {
      const completedTodos
    = prevState.todos.filter(todo => todo.completed);

      return {
        queryTodos: completedTodos,
        filter: 'completed',
      };
    });
    if (this.state.query) {
      this.setState(prevState => {
        const completedTodosQuery
        = prevState.todos.filter(todo => todo.completed)
          .filter(todo => todo.title.toLowerCase()
            .includes(this.state.query.toLowerCase().trim()));

        return {
          queryTodos: completedTodosQuery,
          filter: 'completed',
        };
      });
    }
  };

  handleChangeActive = () => {
    this.setState(prevState => {
      const active = prevState.todos.filter(todo => !todo.completed);

      return {
        queryTodos: active,
        filter: 'active',
      };
    });
    if (this.state.query) {
      this.setState(prevState => {
        const activeQuery = prevState.todos.filter(todo => !todo.completed)
          .filter(todo => todo.title.toLowerCase()
            .includes(this.state.query.toLowerCase().trim()));

        return {
          queryTodos: activeQuery,
          filter: 'active',
        };
      });
    }
  };

  findQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    this.setState({ query });

    if (this.state.filter === 'active') {
      this.setState(prevState => {
        const activeQuery = prevState.todos.filter(todo => !todo.completed)
          .filter(todo => todo.title.toLowerCase()
            .includes(query.toLowerCase().trim()));

        return {
          queryTodos: activeQuery,
        };
      });
    } else if (this.state.filter === 'completed') {
      this.setState(prevState => {
        const completedTodosQuery
      = prevState.todos.filter(todo => todo.completed)
        .filter(todo => todo.title.toLowerCase()
          .includes(query.toLowerCase().trim()));

        return {
          queryTodos: completedTodosQuery,
        };
      });
    } else {
      this.setState(prevState => {
        const queryTodos
          = prevState.todos.filter(todo => todo.title.toLowerCase()
            .includes(query.toLowerCase().trim()));

        return { queryTodos };
      });
    }
  };

  resetQuery = () => {
    this.setState(prevState => {
      const reset = prevState.todos;

      return { queryTodos: reset, query: '' };
    });

    if (this.state.filter === 'active') {
      this.setState(prevState => {
        const activeResetQuery
        = prevState.todos.filter(todo => !todo.completed);

        return {
          queryTodos: activeResetQuery,
        };
      });
    }

    if (this.state.filter === 'completed') {
      this.setState(prevState => {
        const completedTodosResetQuery
      = prevState.todos.filter(todo => todo.completed);

        return {
          queryTodos: completedTodosResetQuery,
        };
      });
    }
  };

  render() {
    const {
      queryTodos,
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
                {loading
                  ? <Loader />
                  : (
                    <TodoList
                      todos={queryTodos}
                      selectedTodoId={todoId}
                      selectTodo={(todoIdFromlist:number | string) => {
                        this.setState({ todoId: todoIdFromlist });
                      }}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>

        {!!todoId
           && (
             <TodoModal
               todos={queryTodos}
               selectedTodoId={todoId}
               selectTodo={(todoIdFromlist:number | string) => {
                 this.setState({ todoId: todoIdFromlist });
               }}
             />
           )}
      </>
    );
  }
}
