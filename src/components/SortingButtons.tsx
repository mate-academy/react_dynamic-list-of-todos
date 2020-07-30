import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

type SortingProps = {
  onSortByTitle: () => void;
  onSortByComplete: () => void;
  onSortByUser: () => void;
  loading: boolean;
};

export const SortingButtons: FC<SortingProps> = (props) => {
  const {
    onSortByTitle,
    onSortByComplete,
    onSortByUser,
    loading,
  } = props;

  return (
    <>
      <h3>Sorting by:</h3>
      <ButtonGroup
        color="primary"
        variant="outlined"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={onSortByTitle}
          disabled={loading}
        >
          Sort by title
        </Button>
        <Button
          onClick={onSortByComplete}
          disabled={loading}
        >
          Sort by completed
        </Button>
        <Button
          onClick={onSortByUser}
          disabled={loading}
        >
          Sort by user
        </Button>
      </ButtonGroup>
    </>
  );
};
