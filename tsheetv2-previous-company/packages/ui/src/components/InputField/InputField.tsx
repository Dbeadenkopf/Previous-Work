import * as React from 'react';

import combineClasses from '@t1cg/combine-classes';

import styles from './InputField.module.scss';

interface IProps {
  width?: 'small' | 'medium' | 'large';
  height?: 'small' | 'medium' | 'large';
  align?: 'left' | 'center' | 'right';
  font?: 'small' | 'medium' | 'large';
  bold?: boolean;
  labelPos?: 'left' | 'top';
  flex?: boolean;
  multi?: boolean;
}

type InputProps = IProps & React.HTMLProps<HTMLInputElement>;
type TextAreaProps = IProps & React.HTMLProps<HTMLTextAreaElement>;

const InputField = ({
  width,
  height,
  align,
  font,
  bold,
  label,
  labelPos,
  flex,
  disabled,
  multi,
  ...rest
}: InputProps | TextAreaProps) => {
  let Input: any = 'input';
  if (multi) {
    Input = 'textarea';
  }

  return (
    <div className={flex ? styles.flexInput : 'inputField'}>
      {label && (
        <label
          className={!labelPos || labelPos === 'left' ? styles.labelLeft : styles.labelTop}
          htmlFor={label}>
          {label}
        </label>
      )}
      {labelPos === 'top' && <br />}

      {!multi ? (
        <Input
          {...rest}
          id={label}
          disabled={disabled}
          className={combineClasses(
            {[styles.disabled]: !!disabled},
            styles.inputField,
            width ? styles[`${width}Width`] : styles.defaultWidth,
            height && !multi ? styles[`${height}Height`] : styles.defaultHeight,
            align ? styles[`${align}Align`] : styles.leftAlign,
            font ? styles[`${font}Font`] : styles.mediumFont,
            bold ? styles.bold : ''
          )}
        />
      ) : (
        <Input
          {...rest}
          id={label}
          disabled={disabled}
          className={combineClasses(
            {[styles.disabled]: !!disabled},
            styles.textarea,
            width ? styles[`${width}Width`] : styles.defaultWidth,
            align ? styles[`${align}Align`] : styles.leftAlign,
            font ? styles[`${font}Font`] : styles.mediumFont,
            bold ? styles.bold : ''
          )}
        />
      )}
    </div>
  );
};

export default InputField;
