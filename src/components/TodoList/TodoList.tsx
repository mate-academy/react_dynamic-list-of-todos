import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

// Props recebidas do componente pai (App).
// A lista 'todos' já vem filtrada — este componente apenas renderiza.
type Props = {
  // Lista de todos já filtrados por status e query
  todos: Todo[];
  // ID do todo atualmente selecionado (0 = nenhum selecionado)
  selectedTodoId: number;
  // Callback chamado ao clicar no botão "eye" de um todo
  onSelectTodo: (todo: Todo) => void;
};

// Componente que renderiza a tabela de todos.
// Cada todo exibe: ID, ícone de completado, título (com cor), e botão de ação.
// Usa a lib 'classnames' para definir classes CSS condicionalmente, conforme
// recomendado no checklist do projeto.
export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectTodo,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        </th>
        <th>Title</th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => {
        // Verifica se ESTE todo é o atualmente selecionado,
        // para destacar a linha e trocar o ícone do botão
        const isSelected = todo.id === selectedTodoId;

        return (
          <tr
            data-cy="todo"
            className={classNames({
              // Destaca a linha com fundo azul claro se for o todo selecionado
              'has-background-info-light': isSelected,
            })}
            key={todo.id}
          >
            {/* Coluna do ID do todo */}
            <td className="is-vcentered">{todo.id}</td>

            {/* Coluna do ícone de "completado" — só aparece se todo.completed */}
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            {/* Coluna do título — verde se completado, vermelho se pendente */}
            <td className="is-vcentered is-expanded">
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>

            {/* Coluna do botão de ação (eye / eye-slash) */}
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelectTodo(todo)}
              >
                <span className="icon">
                  {/* fa-eye-slash quando selecionado, fa-eye quando não */}
                  <i
                    className={classNames('far', {
                      'fa-eye': !isSelected,
                      'fa-eye-slash': isSelected,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
