import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  loading?: boolean;
  error?: string | null;
  onViewUserDetails: (todo: Todo) => void; // Modificado para aceitar o objeto Todo
}

export const TodoList: React.FC<Props> = ({
  todos,
  loading,
  error,
  onViewUserDetails,
}) => (
  <table className="table is-narrow is-fullwidth is-hoverable">
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
      {todos.length === 0 && !error && !loading && (
        <tr>
          <td colSpan={4}>No todos yet.</td>
        </tr>
      )}
      {todos.map((todo, index) => (
        <tr
          key={todo.id}
          data-cy="todo"
          className=""
          // className={todo.completed ? 'has-background-success-light' : ''}
        >
          <td className="is-vcentered">{index + 1}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>
          <td
            className={`is-vcentered is-expanded ${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
          >
            <p>{todo.title}</p>
          </td>
          <td className="has-text-right is-vcentered">
            {/* Adicione botões de ação aqui se necessário */}
            <button
              data-cy="selectButton" // Pode querer renomear para algo como "viewUserButton"
              className="button"
              type="button"
              onClick={() => onViewUserDetails(todo)} // Passar o objeto todo inteiro
            >
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          </td>
        </tr>
      ))}

      {/*
      <tr data-cy="todo" className="">
        <td className="is-vcentered">1</td>
        <td className="is-vcentered" />
        <td className="is-vcentered is-expanded">
          <p className="has-text-danger">delectus aut autem</p>
        </td>
        <td className="has-text-right is-vcentered">
          <button data-cy="selectButton" className="button" type="button">
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        </td>
      </tr>

      <tr data-cy="todo" className="has-background-info-light">
        <td className="is-vcentered">2</td>
        <td className="is-vcentered" />
        <td className="is-vcentered is-expanded">
          <p className="has-text-danger">quis ut nam facilis et officia qui</p>
        </td>
        <td className="has-text-right is-vcentered">
          <button data-cy="selectButton" className="button" type="button">
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          </button>
        </td>
      </tr>

      <tr data-cy="todo" className="">
        <td className="is-vcentered">1</td>
        <td className="is-vcentered" />
        <td className="is-vcentered is-expanded">
          <p className="has-text-danger">delectus aut autem</p>
        </td>
        <td className="has-text-right is-vcentered">
          <button data-cy="selectButton" className="button" type="button">
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        </td>
      </tr>

      <tr data-cy="todo" className="">
        <td className="is-vcentered">6</td>
        <td className="is-vcentered" />
        <td className="is-vcentered is-expanded">
          <p className="has-text-danger">
            qui ullam ratione quibusdam voluptatem quia omnis
          </p>
        </td>
        <td className="has-text-right is-vcentered">
          <button data-cy="selectButton" className="button" type="button">
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        </td>
      </tr>

      <tr data-cy="todo" className="">
        <td className="is-vcentered">8</td>
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
        <td className="is-vcentered is-expanded">
          <p className="has-text-success">quo adipisci enim quam ut ab</p>
        </td>
        <td className="has-text-right is-vcentered">
          <button data-cy="selectButton" className="button" type="button">
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        </td>
      </tr>
      */}
    </tbody>
  </table>
);
