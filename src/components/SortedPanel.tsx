import React from 'react';
import { ControlPanel } from './interfaces';

interface Props {
  sortedPanelInfo: ControlPanel[];
}

export const SortedPanel: React.FC<Props> = ({ sortedPanelInfo }) => (
  <ul className="list">
    {sortedPanelInfo.map(panel => (
      <li className="item" key={panel.link}>
        <a
          href={panel.link}
          className="link"
          onClick={() => panel.clickEvent(panel.sortedName)}
        >
          {panel.name}
        </a>
      </li>
    ))}
  </ul>
);
