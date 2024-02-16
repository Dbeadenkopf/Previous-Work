import * as React from 'react';

import combineClasses from '@t1cg/combine-classes';

import styles from './Initials.module.scss';

interface InitialsProps {
  firstName: string;
  lastName: string;
  clickable?: boolean;
  // Default -> 'Warning'
  bgColor?: 'Primary' | 'Secondary' | 'Warning' | 'Success' | 'Danger';
  // Default -> 'Secondary'
  borderColor?: 'Primary' | 'Secondary' | 'Warning' | 'Success' | 'Danger';
  // Default -> 'White'
  textColor?: 'White' | 'Black' | 'Primary' | 'Secondary' | 'Warning' | 'Success' | 'Danger';
  size?: 'Small' | 'Medium' | 'Large';
}

const Initials = ({
  firstName,
  lastName,
  clickable = false,
  bgColor = 'Warning',
  borderColor = 'Secondary',
  textColor = 'White',
  size = 'Large',
}: InitialsProps) => {
  const initials = firstName.charAt(0) + lastName.charAt(0);

  return (
    <div
      className={combineClasses(
        styles.content,
        styles[`bg${bgColor}`],
        styles[`border${borderColor}`],
        styles[`text${textColor}`],
        clickable ? styles.clickable : '',
        styles[size]
      )}>
      {initials}
    </div>
  );
};

export default Initials;
