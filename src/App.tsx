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
import { FILTERS } from './filter/filter';
import { TodoContext } from './context/todocontext';

export const App: React.FC = () => {
  const { all, active, completed } = FILTERS;

  const [showModal, setShowModal] = useState<boolean>(true);
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);
  const [todoId, setTodoId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null)

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtrar, setFiltrar] = useState<string>(all);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [query, setQuery] = useState<string>('');
  /*- Mas nesse momento todos ainda
  é [] (porque o getTodos roda depois no useEffect).
Resultado: filteredTodos começa vazio.
- Você só chama setFilteredTodos dentro do handleQuery.
Então, até digitar algo, filteredTodos nunca é atualizado.

 */

  const onQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const onFiltered = (newFiltered: Todo[]) => {
    setFilteredTodos(newFiltered);
  };

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .finally(() => setIsLoading(false))
        .catch(err => setError(err.message));
    }, 1000);
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  /*Use um useEffect no App para atualizar filteredTodos sempre que todos mudar:
  Assim, quando o getTodos terminar, filteredTodos recebe a lista completa e já renderiza.
  */

  const filtred = todos.filter(t => {
    const normalized = query.trim().toLowerCase();
    /*aqui säo 2 condiçoes, se normalized.length === 0 retorne true e todos os itens entram no if return matchesQuery(return matchesQuery)
                            normalized = 'carro' normalized.length sera false mas se no titulo incluir normalized matchesquery sera
                            true e retornara a lista filtrada.  matchesQuery retorna true ou false*/
    const matchesQuery =
      normalized.length === 0 ||
      t.title.trim().toLocaleLowerCase().includes(normalized);

    if (!t) {
      return false;
    } else if (filtrar === active) {
      return matchesQuery && !t.completed; // mostra os que tem o t.completed = false, pq a negação pega os falses e tranforma em true para que o operador logica && tenha os 2 lados = true
    } else if (filtrar === completed) {
      return matchesQuery && t.completed;
    }
    return matchesQuery;
  });

  const handleFilterAll = () => setFiltrar(all);

  const handleActive = () => setFiltrar(active);

  const handleCompleted = () => setFiltrar(completed);

  const handleModalClick = (show: boolean) => {
    setShowModal(show);
  };

  const handleIsLoading = (loading: boolean) => {
    setIsLoadingModal(loading);
  };

  const handleGetTodoId = (id: number) => {
    setTodoId(id);
  };
  const handleUserId = (id: number) => {
    setUserId(id)
  }
  console.log('userid', userId)

  return (
    <>
      <TodoContext.Provider
        value={{
          todos,
          onFiltered,
          filteredTodos,
          handleFilterAll,
          handleActive,
          handleCompleted,
          filtred,
          onQuery,
          query,
          filtrar,
          handleModalClick,
          showModal,
          handleIsLoading,
          isLoadingModal,
          handleGetTodoId,
          setTodoId,
          todoId,
          handleUserId,
          userId,

        }}
      >
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                {isLoading && <Loader />}

                {!isLoading && todos.length > 0 && <TodoList />}
              </div>
            </div>
          </div>
        </div>
        <TodoModal />
      </TodoContext.Provider>
    </>
  );
};
