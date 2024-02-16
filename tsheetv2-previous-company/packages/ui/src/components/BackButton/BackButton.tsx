import React from 'react';

import Tab, {IProps as ITab} from './BackTab';

const BackButton = (tabs: ITab[], element: React.ReactElement) => (
  <>
    <div>
      {tabs.map(({to, label}, i) => (
        <Tab key={i} to={to} label={label} />
      ))}
    </div>
    <br />
    {element}
  </>
);

export default BackButton;
