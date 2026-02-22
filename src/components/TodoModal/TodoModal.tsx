import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

// Props recebidas do componente pai (App).
type Props = {
  // O todo que foi selecionado na lista — será exibido no modal
  todo: Todo;
  // Callback para fechar o modal (seta selectedTodo = null no App)
  onClose: () => void;
};

// Componente do modal que exibe os detalhes de um todo selecionado.
// Ao montar, faz uma chamada à API para buscar os dados do usuário
// associado ao todo (via todo.userId), e exibe um Loader enquanto espera.
export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  // Dados do usuário carregados da API (null enquanto não carregou)
  const [user, setUser] = useState<User | null>(null);

  // Controla a exibição do Loader dentro do modal
  const [loading, setLoading] = useState(false);

  // useEffect é executado sempre que o 'todo.userId' muda.
  // Carrega os dados do usuário associado ao todo selecionado.
  useEffect(() => {
    setLoading(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      {/* Fundo escuro semi-transparente atrás do modal */}
      <div className="modal-background" />

      {loading ? (
        // Exibe o Loader enquanto os dados do usuário estão sendo carregados
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            {/* Cabeçalho do modal: "Todo #<id>" */}
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* Botão para fechar o modal (×) */}
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            {/* Título do todo */}
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            {/* Status + nome do usuário */}
            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                // Verde = tarefa concluída
                <strong className="has-text-success">Done</strong>
              ) : (
                // Vermelho = tarefa pendente
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {/* Link mailto com o email do usuário — exibe o nome */}
              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
