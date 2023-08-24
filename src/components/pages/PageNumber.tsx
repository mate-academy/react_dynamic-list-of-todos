// eslint-disable
import { useContext } from 'react';
import {
  // StateContext,
  DispatchContext,
  ACTIONS,
} from '../ToDoContext';

type Props = {
  page: number,
};

export const Page: React.FC<Props> = ({ page }) => {
  const dispatch = useContext(DispatchContext);

  function clickHandler(e: React.MouseEvent) {
    dispatch({
      type: ACTIONS.SET_CURRENT_PAGE,
      payload: Number(e.currentTarget.textContent),
    });
  }

  return (
    <button
      type="button"
      value={2}
      onClick={(e) => clickHandler(e)}
    >
      {page}
    </button>
  );
};
