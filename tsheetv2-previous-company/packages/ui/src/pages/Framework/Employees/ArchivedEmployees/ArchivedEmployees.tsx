import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

import {getArchivedUsers} from '@actions/framework';
import Button from '@components/Button';
import Initials from '@components/Initials';
import Table, {Column} from '@components/Table';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectUsers} from '@selectors/framework';

import styles from './ArchivedEmployees.module.scss';

const ArchivedEmployees = () => {
  const dispatch = useAppDispatch();

  const employees = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(getArchivedUsers());
  }, [dispatch]);

  const columns: Column[] = [
    {
      key: 'label',
      header: 'Label',
      hideHeader: true,
      width: 15,
      align: 'right',
    },
    {
      key: 'info',
      header: 'info',
      hideHeader: true,
      width: 100,
    },
    {
      key: 'button',
      header: 'Button',
      hideHeader: true,
      width: 100,
      align: 'center',
    },
  ];

  return (
    <div className={styles.employees}>
      <h2 className={styles.title}>{'Archived Employees (' + employees.length + ')'}</h2>
      <div className={styles.table}>
        <div className={styles.padding}>
          <Table
            columns={columns}
            data={employees.map(({_id, firstName, lastName, email}) => ({
              label: (
                <>
                  <Initials
                    firstName={firstName}
                    lastName={lastName}
                    bgColor="Secondary"
                    borderColor="Secondary"
                  />
                </>
              ),
              info: (
                <div>
                  <b>{firstName + ' ' + lastName}</b> <br />
                  {email}
                </div>
              ),
              button: (
                <Link className={styles.link} to={`/framework/employees/${_id}`}>
                  <Button className={styles.button}>View</Button>
                </Link>
              ),
            }))}
            wrapContent={true}
            divider={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ArchivedEmployees;
