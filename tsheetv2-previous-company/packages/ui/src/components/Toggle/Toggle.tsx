import React from 'react';

import combineClasses from '@t1cg/combine-classes';

import styles from './Toggle.module.scss';

interface ToggleProps {
  isToggled: boolean;
  onToggle: React.ChangeEventHandler<HTMLInputElement>;
  color?: 'blue' | 'orange';
}

const Toggle = ({isToggled, onToggle, color = 'orange'}: ToggleProps & React.HTMLProps<HTMLInputElement>) => (
  <>
    <label className={styles.switch}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={combineClasses(styles.slider, styles[color])}></span>
    </label>
  </>
);

export default Toggle;
