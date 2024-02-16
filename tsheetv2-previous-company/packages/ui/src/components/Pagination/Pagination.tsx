import React, {useEffect, useState} from 'react';

import styles from './Pagination.module.scss';

interface IProps {
  pages: number;
  currentPage: number;
  totalRecords: number;
  nRecords: number;
  firstRecordIdx: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({pages, currentPage, nRecords, firstRecordIdx, totalRecords, setCurrentPage}: IProps) => {
  const pageNumbers = [];
  for (let i = 0; i < pages; i++) {
    pageNumbers.push(i + 1);
  }

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const [recordRange, setRecordRange] = useState(`${firstRecordIdx + 1} - ${nRecords} of ${totalRecords}`);
  useEffect(() => {
    setRecordRange(
      `${firstRecordIdx + 1} - ${nRecords <= totalRecords ? nRecords : totalRecords} of ${totalRecords}`
    );
  }, [firstRecordIdx, nRecords, totalRecords]);

  return (
    <nav className={styles.paginationContainer}>
      <ul className={styles.pageNavContainer}>
        <li>
          <a href="#" onClick={prevPage}>
            &#9664;
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li key={pgNumber}>
            <a
              href="#"
              onClick={() => {
                setCurrentPage(pgNumber);
              }}>
              {pgNumber === currentPage ? <b>{pgNumber}</b> : pgNumber}
            </a>
          </li>
        ))}
        <li>
          <a href="#" onClick={nextPage}>
            &#9654;
          </a>
        </li>
      </ul>
      <span className={styles.rangeContainer}>{recordRange}</span>
    </nav>
  );
};

export default Pagination;
