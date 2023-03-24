/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosOriginal, setTodosOriginal] = useState<Todo[]>([]);
  const [userId, setUserId] = useState(0);
  const [select, setSelect] = useState('all');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [todoId, setTodoId] = useState(0);

  useEffect(() => {
    const todoList = async () => {
      const todoPromise = await getTodos();

      setTodosOriginal(todoPromise);
      setTodos(todoPromise);
      setLoading(true);
    };

    todoList();
  }, []);

  useEffect(() => {
    const todoSelect: Todo[] = todosOriginal
      .filter((todo: Todo) => {
        const tittleCase = todo.title.toLowerCase();
        const queryCase = query.toLowerCase();

        switch (select) {
          case 'active':
            return (!todo.completed && tittleCase.includes(queryCase));
          case 'completed':
            return (todo.completed && tittleCase.includes(queryCase));
          default:
            return (tittleCase.includes(queryCase));
        }
      }) || [];

    setTodos(todoSelect);
  }, [select, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedTodo={select}
                selectTodos={(selectList: string) => {
                  setSelect(selectList);
                }}
                query={query}
                querySet={(queryText: string) => {
                  setQuery(queryText);
                }}
              />
            </div>

            <div className="block">
              {!loading
                ? <Loader />
                : <TodoList todos={todos} todoId={todoId} setTodoId={(id: number) => setTodoId(id)} setUserId={(id: number) => setUserId(id)} />}
            </div>
          </div>
        </div>
      </div>

      {todoId > 0 && <TodoModal userId={userId} setUserId={(id: number) => setUserId(id)} setTodo={(id: number) => setTodoId(id)} todoId={todoId} todos={todos} />}
    </>
  );
};
