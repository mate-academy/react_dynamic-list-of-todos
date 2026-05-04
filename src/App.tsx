/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import * as apiMetodos from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [originalTodo, setOriginalTodo] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const [numberSet, setNumber] = useState(0);
  const [todoComment, setTodoComment] = useState('');
  const [completed, setCompleted] = useState<boolean | null>(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoader(true);
        const r = await apiMetodos.getTodos();

        setTodos(r);
        setOriginalTodo(r);
        setIsLoaded(true);
      } catch (error) {
        throw new Error('Erro LoadTodos');
      } finally {
        setLoader(false);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (search === '' && status === 'all') {
      setTodos(originalTodo);

      return;
    }

    let filtered = [...originalTodo];

    if (search.trim()) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(t =>
        status === 'active' ? !t.completed : t.completed,
      );
    }

    setTodos(filtered);
  }, [search, status, originalTodo, isLoaded]);

  const seeComent = (todo: Todo) => {
    const update = (arr: Todo[]) =>
      arr.map(item =>
        item.id === todo.id ? { ...item, completed: true } : item,
      );

    setTodos(prev => update(prev));
    setOriginalTodo(prev => update(prev));
  };

  const onShow = async (
    userNumber: number,
    comment: string,
    completedTrue: boolean | null,
    todo: Todo | null,
  ) => {
    if (userNumber === 0) {
      setNumber(0);
      setUsers(undefined);
      setSelectedTodoId(null);
      setSelectedTodo(null);

      return;
    }

    try {
      setIsLoading(true);
      setNumber(userNumber);
      setSelectedTodoId(todo ? todo.id : null);
      setSelectedTodo(todo);

      const r = await apiMetodos.getUser(userNumber);

      setUsers(r);

      setCompleted(completedTrue);
      setTodoComment(comment);
    } catch (error) {
      throw new Error('Erro Onshow');
    } finally {
      setIsLoading(false);
    }

    if (todo !== null && !todo.completed) {
      seeComent({ ...todo, completed: true });
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                search={search}
                setSearch={setSearch}
                setStatus={setStatus}
                status={status}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              <TodoList
                todo={todos}
                onShow={onShow}
                selectedTodoId={selectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {numberSet !== 0 && (
        <TodoModal
          user={users}
          isLoading={isLoading}
          onShow={onShow}
          todoComment={todoComment}
          completed={completed}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
