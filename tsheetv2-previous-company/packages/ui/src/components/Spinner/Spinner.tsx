import * as React from 'react';

import combineClasses from '@t1cg/combine-classes';

import styles from './Spinner.module.scss';

interface Props {
  className?: string;
  squareClassName?: string;
  color?: string;
  delay?: number;
}

const Spinner = (props: Props) => {
  const {color = '#011B3E', delay = 500} = props;
  const [show, setShow] = React.useState(delay === 0);

  React.useEffect(() => {
    const showIt = () => setShow(true);

    const delayTimer = window.setTimeout(showIt, delay);

    return () => {
      window.clearTimeout(delayTimer);
    };
  }, [delay]);

  return (
    <div className={combineClasses(styles.container, styles[color], props.className)}>
      {show &&
        [1, 2, 3, 4].map((_, i) => (
          <span key={i} className={combineClasses(styles.square, props.squareClassName)} />
        ))}
    </div>
  );
};

export default Spinner;
