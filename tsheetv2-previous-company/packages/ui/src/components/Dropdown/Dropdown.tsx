import React from 'react';

import combineClasses from '@t1cg/combine-classes';

import styles from './Dropdown.module.scss';

interface IProps extends React.HTMLProps<HTMLSelectElement> {
  options: {id: string; name: string; disabled?: boolean}[];
  width?: 'extraSmall' | 'small' | 'medium' | 'large';
  height?: 'small' | 'medium' | 'large';
  align?: 'left' | 'center' | 'right';
  font?: 'small' | 'medium' | 'large';
  bold?: boolean;
  label?: string;
  labelPos?: 'left' | 'top';
  blank?: boolean;
  flex?: boolean;
  loading?: boolean;
}

const Dropdown = ({
  options,
  width,
  height,
  align,
  font,
  bold,
  label,
  labelPos,
  blank,
  flex,
  loading,
  disabled,
  ...rest
}: IProps) => (
  <div className={flex ? styles.flexDropdown : 'dropdown'}>
    {label && (
      <label
        className={!labelPos || labelPos === 'left' ? styles.labelLeft : styles.labelTop}
        htmlFor={label}>
        {label}
      </label>
    )}
    {labelPos === 'top' && <br />}

    <select
      {...rest}
      id={label}
      className={combineClasses(
        {[styles.disabled]: !!disabled, [styles.loading]: !!loading},
        styles.selector,
        width ? styles[width] : styles.defaultWidth,
        height ? styles[`${height}Height`] : styles.defaultHeight,
        align ? styles[`${align}Align`] : styles.leftAlign,
        font ? styles[`${font}Font`] : styles.mediumFont,
        bold ? styles.bold : ''
      )}
      disabled={disabled}>
      {blank && <option></option>}

      {options.map((option) => (
        <option disabled={option.disabled} key={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;
