import React from 'react';
import ClassNames from 'classnames';
import './todo.css';

type Props = {
  todos: TodoWithUser[];
};

const TodosList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <div className="todo">
      {todos.map(todo => (
        <div key={todo.id} className="todo__wrapper">
          <p className="todo__body">
            <span className="todo__user">
              <strong>
                {todo.user.name}
              </strong>
            </span>
            :
            {' '}
            {todo.title}
          </p>
          <div className={ClassNames('todo__process', {
            todo__done: todo.completed,
          })}
          >
            Completed:
            {' '}
            {todo.completed ? 'Done' : 'In the process'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodosList;
