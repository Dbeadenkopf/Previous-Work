/*
ICON PROPS/FUNCTIONALITY ARE COMMENTED OUT
UNTIL ICON PACKAGE IS INSTALLED
*/

import * as React from 'react';
import {Link} from 'react-router-dom';

import Spinner from '@components/Spinner';
import combineClasses from '@t1cg/combine-classes';

import styles from './Button.module.scss';

interface ButtonProps {
  // leadingIcon?: React.FunctionComponent<{className: string}>;
  // trailingIcon?: React.FunctionComponent<{className: string}>;
  // centeredIcon?: React.FunctionComponent<{className: string}>;
  variant?: 'filled';
  loading?: boolean;
  /** Number of milliseconds to wait before showing loading spinner. Avoids
   * flash of loading spinner when `loading` is only true for a fraction of a
   * second.
   *
   * @default 500 milliseconds
   * */
  loadingDelay?: number;
  color?: 'primary' | 'secondary' | 'warning' | 'success' | 'danger';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type buttonProps = ButtonProps & React.HTMLProps<HTMLButtonElement & HTMLAnchorElement>;

const Button = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  buttonProps & React.ButtonHTMLAttributes<HTMLButtonElement & HTMLAnchorElement>
>((buttonProps, ref) => {
  const [showLoading, setShowLoading] = React.useState(false);

  const {
    type = 'button',
    variant = 'filled',
    href = '',
    className,
    loading,
    loadingDelay = 500,
    // leadingIcon: LeadingIcon,
    // trailingIcon: TrailingIcon,
    // centeredIcon: CenteredIcon,
    onClick,
    color = 'secondary',
    ...rest
  } = buttonProps;

  const showLoadingTimeout = React.useRef(-1);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Protect against user repeatedly clicking on button while loading
    if (!loading && onClick) {
      onClick(e);
    }
  };

  React.useEffect(() => {
    if (loading) {
      showLoadingTimeout.current = window.setTimeout(() => {
        setShowLoading(true);
      }, loadingDelay);
      return () => {
        window.clearTimeout(showLoadingTimeout.current);
      };
    }

    clearTimeout(showLoadingTimeout.current);
    setShowLoading(false);
  }, [loading, loadingDelay]);

  if (!href) {
    return (
      <button
        {...rest}
        ref={ref}
        onClick={handleClick}
        type={type}
        className={combineClasses(styles.container, styles[variant], styles[color], className, {
          [styles.loading]: !!showLoading,
          // [styles.noContent]: !buttonProps.children || !!CenteredIcon
          [styles.noContent]: !buttonProps.children,
        })}>
        {showLoading && <Spinner className={styles.spinner} squareClassName={styles.spinnerSquare} />}
        {/* {LeadingIcon && <LeadingIcon className={styles.leadingIcon} />} */}
        {/* {CenteredIcon && <CenteredIcon className={styles.centeredIcon} />} */}
        {/* {!CenteredIcon && buttonProps.children} */}
        {buttonProps.children}
        {/* {TrailingIcon && <TrailingIcon className={styles.trailingIcon} />} */}
      </button>
    );
  } else {
    return (
      <Link
        to={href}
        {...rest}
        ref={ref}
        type={type}
        className={combineClasses(styles.linkContainer, styles[variant], styles[color], className, {
          [styles.loading]: !!showLoading,
          // [styles.noContentLink]: !buttonProps.children || !!CenteredIcon,
          [styles.noContentLink]: !buttonProps.children,
        })}>
        {showLoading && <Spinner className={styles.spinner} squareClassName={styles.spinnerSquare} />}
        {/* {LeadingIcon && <LeadingIcon className={styles.leadingIcon} />} */}
        {/* {CenteredIcon && <CenteredIcon className={styles.centeredIcon} />} */}
        {/* {!CenteredIcon && buttonProps.children} */}
        {buttonProps.children}
        {/* {TrailingIcon && <TrailingIcon className={styles.trailingIcon} />} */}
      </Link>
    );
  }
});

Button.displayName = 'Button';

export default Button;
