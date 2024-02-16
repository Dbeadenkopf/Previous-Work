import React, {useEffect, useRef, useState} from 'react';

import combineClasses from '@t1cg/combine-classes';

import styles from './Table.module.scss';

export interface Column {
  key: string;
  header: string | JSX.Element;
  width?: number;
  hideHeader?: boolean;
  hideColumn?: boolean;
  align?: 'right' | 'left' | 'center';
  bold?: boolean;
}

interface TableProps {
  columns: Column[];
  data: any[];
  scroll?: number;
  label?: string;
  divider?: boolean;
  wrapContent?: boolean;
  verticalView?: boolean;
  asReport?: boolean;
}

interface TableHeaderProps {
  col: Column;
  scroll?: number;
  width?: string;
  wrapContent?: boolean;
}

interface TableRowDataProps {
  row: any;
  columns: Column[];
  scroll?: number;
  divider?: boolean;
  wrapContent?: boolean;
  asReport?: boolean;
}

const TableHeader = ({col, scroll, width, wrapContent}: TableHeaderProps) =>
  col.hideColumn ? null : (
    <th
      className={combineClasses(
        scroll ? styles.scrollTh : styles.th,
        col.align && col.align === 'center'
          ? styles.alignCenter
          : col.align === 'right'
          ? styles.alignRight
          : styles.alignLeft
      )}
      style={{
        minWidth: scroll && `${scroll}px`,
        width: width && width,
        fontWeight: col.bold ? 'bold' : 'normal',
        overflow: wrapContent ? 'visible' : 'hidden',
        whiteSpace: wrapContent ? 'normal' : 'pre',
      }}>
      {!col.hideHeader && col.header}
    </th>
  );

const TableRowData = ({row, columns, scroll, divider, wrapContent, asReport}: TableRowDataProps) => (
  <tr className={divider ? styles.trDivider : ''}>
    {columns.map((col: Column) =>
      col.hideColumn ? null : (
        <td
          className={combineClasses(
            scroll ? styles.scrollTd : styles.td,
            {
              [styles.noHeader]: typeof col.hideHeader === 'boolean' && col.hideHeader,
            },
            col.align && col.align === 'center'
              ? styles.alignCenter
              : col.align === 'right'
              ? styles.alignRight
              : styles.alignLeft
          )}
          key={col.key}
          style={{
            overflow: wrapContent ? 'visible' : 'hidden',
            whiteSpace: wrapContent ? 'normal' : 'pre',
          }}
          data-th={asReport ? '' : col.header + ': '}>
          {typeof row[`${col.key}`] === 'boolean' || typeof row[`${col.key}`] === 'number'
            ? row[`${col.key}`].toString()
            : row[`${col.key}`]}
        </td>
      )
    )}
  </tr>
);

const Table = ({columns, data, scroll, label, divider, wrapContent, verticalView, asReport}: TableProps) => {
  const widths = columns.map((col) => {
    const pixels = col.hideColumn ? '' : `${typeof col.width === 'undefined' ? '' : `${col.width}px`}`;
    return pixels;
  });

  const hideAllHeaders = columns.every((col) => col.hideHeader === true);

  const [containerWidth, setContainerWidth] = useState(0);
  const [childWidth, setChildWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLTableElement>(null);

  // Calc widths on mount
  useEffect(() => {
    if (containerRef.current !== null && childRef.current !== null) {
      setContainerWidth(containerRef.current.offsetWidth);
      setChildWidth(childRef.current.offsetWidth);
    }
  }, []);

  // Calc widths when resizing
  window.addEventListener('resize', () => {
    if (containerRef.current !== null && childRef.current !== null) {
      setContainerWidth(containerRef.current.offsetWidth);
      setChildWidth(childRef.current.offsetWidth);
    }
  });

  return (
    <div
      ref={containerRef}
      className={combineClasses(
        styles.tableContainer,
        // If width of table exceeds its container, make it scrollable
        childWidth > containerWidth ? styles.scrollOnOverflow : ''
      )}>
      <header className={label ? styles.label : styles.noLabel}>{label && label}</header>
      <table
        ref={childRef}
        className={scroll ? styles.scrollTable : verticalView ? styles.verticalView : styles.table}>
        <thead style={{visibility: hideAllHeaders ? 'collapse' : 'visible'}}>
          <tr className={combineClasses(divider ? styles.trDivider : '', label && styles.headerDivider)}>
            {columns.map((col, i) => (
              <TableHeader
                key={col.key}
                col={col}
                scroll={scroll}
                width={widths[i]}
                wrapContent={wrapContent}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <TableRowData
              key={i}
              row={row}
              columns={columns}
              scroll={scroll}
              divider={divider}
              wrapContent={wrapContent}
              asReport={asReport}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
