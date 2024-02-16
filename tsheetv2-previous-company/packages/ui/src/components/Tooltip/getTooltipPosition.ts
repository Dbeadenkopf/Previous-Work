const getTooltipPosition = (el: HTMLElement, tooltip: HTMLDivElement, position: string, gap: number) => {
  const {top: elTop, left: elLeft, height: elHeight, width: elWidth} = el.getBoundingClientRect();
  const {width: tooltipWidth, height: tooltipHeight} = tooltip.getBoundingClientRect();
  let newLeft = elLeft;
  let newTop = elTop;
  switch (position) {
    case 'bottom': {
      newLeft = newLeft + elWidth / 2 - tooltipWidth / 2;
      newTop = newTop + elHeight + gap * 1.5;
      break;
    }
    case 'left': {
      newLeft = elLeft - gap * 1.5 - tooltipWidth;
      newTop = newTop + elHeight / gap - tooltipHeight / gap;
      break;
    }
    case 'right': {
      newLeft = newLeft + elWidth + gap * 1.5;
      newTop = newTop + elHeight / gap - tooltipHeight / gap;
      break;
    }
    case 'top':
    default:
      newLeft = newLeft + elWidth / 2 - tooltipWidth / 2;
      newTop = newTop - gap - tooltipHeight;
  }
  return {
    left: newLeft,
    top: newTop,
  };
};

export default getTooltipPosition;
