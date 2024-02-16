import React, {Children, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import combineClasses from '@t1cg/combine-classes';

import getTooltipPosition from './getTooltipPosition';

import styles from './Tooltip.module.scss';

interface TooltipProps {
  content: string | React.ReactNode;
  gap?: number;
  color?: 'blue' | 'orange' | 'grey';
  position?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  color = 'blue',
  position = 'top',
  gap = 10,
  content,
  disabled = false,
}) => {
  const child = Children.only(children);
  const childRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = childRef.current as HTMLElement;

    const handleMouseEnter = () => {
      setHover(true);
      const tooltip = tooltipRef.current as HTMLDivElement;

      if (!tooltip) {
        return;
      }

      const {left, top} = getTooltipPosition(el, tooltip, position, gap);
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    };

    const handleMouseLeave = () => {
      setHover(false);
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
  });

  return (
    <>
      {React.isValidElement(child) && (
        <div
          ref={(el) => {
            childRef.current = el;
          }}>
          {child}
        </div>
      )}
      {hover &&
        disabled === false &&
        createPortal(
          <div ref={tooltipRef} className={combineClasses(styles.tooltip, styles[color], styles[position])}>
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
