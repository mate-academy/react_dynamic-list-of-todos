import React, { FC } from 'react';

interface Props {
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}

export const Todo: FC<Props> = ({
  id, title, completed, user,
}) => {
  return (
    <>
      <p className="title">{`${id} ${title}`}</p>
      {completed
        ? (<p className="completed">Yes</p>)
        : (<p className="not-completed">No</p>)}
      {user && (<p>{user.name}</p>)}
    </>
  );
};


export default Todo;
