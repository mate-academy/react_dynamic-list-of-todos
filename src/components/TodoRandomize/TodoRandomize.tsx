import React from 'react';

interface Props {
  setShuffleTodos: (todos: Todo[]) => void;
  todos: Todo[];
}

export const TodoRandomize: React.FC<Props> = (props) => {
  const shuffleTodos = () => {
    let j = 0;
    let temp;
    const { todos } = props;

    for (let i = todos.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = todos[j];
      todos[j] = todos[i];
      todos[i] = temp;
    }

    return props.setShuffleTodos(todos);
  };

  return (
    <button
      className="button"
      type="button"
      onClick={(event) => {
        event.preventDefault();
        shuffleTodos();
      }}
    >
      Randomize
    </button>
  );
};
