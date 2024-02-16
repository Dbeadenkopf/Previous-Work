import * as React from 'react';

import combineClasses from '@t1cg/combine-classes';

import styles from './AddRemoveButton.module.scss';

interface AddRemoveProps {
  type: 'add' | 'remove';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label?: string;
  // default colors are primary
  buttonColor?: 'primary' | 'secondary' | 'warning' | 'success' | 'danger';
  fontColor?: 'primary' | 'secondary' | 'warning' | 'success' | 'danger';
  className?: string;
  disabled?: boolean;
  hover?: boolean;
  // default size is regular, AKA ''
  size?: '' | 'fa-2xs' | 'fa-xs' | 'fa-sm' | 'fa-lg' | 'fa-xl' | 'fa-2xl';
}

type addRemoveProps = AddRemoveProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

const AddRemoveButton = (props: addRemoveProps) => {
  const {
    label,
    className,
    disabled,
    type,
    size = '',
    buttonColor = 'primary',
    fontColor = 'primary',
    hover,
    onClick,
    ...rest
  } = props;

  const fontSize = size === '' ? 'Reg' : size.substring(3);

  return (
    <div className={combineClasses(styles.container, hover ? styles[`hover-${type}`] : '')}>
      <i
        {...rest}
        className={combineClasses(
          className,
          type === 'add' ? `fa fa-circle-plus ${size}` : `fa fa-circle-xmark ${size}`,
          disabled ? styles.disabledButton : styles.button,
          !disabled ? styles[`${buttonColor}`] : ''
        )}
        onClick={!disabled ? onClick : () => {}}
      />
      {label && (
        <span
          className={combineClasses(
            styles[`font${fontSize}`],
            !disabled ? styles[`${fontColor}`] : '',
            disabled ? styles.disabledLabel : styles.label
          )}
          onClick={!disabled ? onClick : () => {}}>
          {label}
        </span>
      )}
    </div>
  );
};

AddRemoveButton.displayName = 'AddRemoveButton';

export default AddRemoveButton;
