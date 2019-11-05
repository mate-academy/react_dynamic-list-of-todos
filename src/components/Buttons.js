import React from 'react';
import { Button } from 'semantic-ui-react';

function Buttons({ switcher }) {
  return (
    <>
      <Button
        type="button"
        onClick={() => switcher('byTitle')}
      >
        By User!
      </Button>
      <Button
        type="button"
        onClick={() => switcher('byUser')}
      >
        By Title!
      </Button>
      <Button
        type="button"
        onClick={() => switcher('byStatus')}
      >
        By Status!
      </Button>
    </>
  );
}

export default Buttons;
