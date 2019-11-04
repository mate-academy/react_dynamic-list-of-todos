import React from 'react';
import { Button } from 'semantic-ui-react';

function Buttons({ filters }) {
  return (
    <>
      <Button
        type="button"
        onClick={e => filters(e)}
        inverted
        color="green"
      >
        By User!
      </Button>
      <Button
        type="button"
        onClick={e => filters(e)}
        inverted
        color="yellow"
      >
        By Title!
      </Button>
      <Button
        type="button"
        onClick={e => filters(e)}
        inverted
        color="red"
      >
        By Status!
      </Button>
    </>
  );
}

export default Buttons;
