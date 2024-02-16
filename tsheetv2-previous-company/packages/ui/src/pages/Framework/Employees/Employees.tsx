import React, {ChangeEvent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {addEmployee, getReviewers, getSupervisees} from '@actions/framework';
import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import Initials from '@components/Initials';
import InputField from '@components/InputField';
import Tooltip from '@components/Tooltip';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectPermissions, selectUser} from '@selectors/auth';
import {selectAddEmployeeRequest, selectReviewers, selectUsers} from '@selectors/framework';
import combineClasses from '@t1cg/combine-classes';
import checkPermission from '@util/checkPermission';

import styles from './Employees.module.scss';

const Employees = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const reviewers = useAppSelector(selectReviewers);
  const addEmployeeRequest = useAppSelector(selectAddEmployeeRequest);
  const currentUser = useAppSelector(selectUser);
  const permissions = useAppSelector(selectPermissions);

  const userId = currentUser._id as string;

  useEffect(() => {
    dispatch(getSupervisees(userId));
  }, [dispatch, userId, addEmployeeRequest.success]);

  useEffect(() => {
    dispatch(getReviewers());
  }, [dispatch]);

  const options = reviewers.map((r) => ({id: r._id as string, name: r.firstName + ' ' + r.lastName}));

  const initForm = {
    first: '',
    last: '',
    email: '',
    title: '',
    supervisor: '',
  };

  const [emp, setEmp] = useState(initForm);

  const isFilled = Object.values(emp).every((e) => e.trim() !== '');
  const isValidEmail = emp.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

  return (
    <div>
      <div className={styles.container}>
        <ul className={styles.namesList}>
          <li className={styles.nameItem}>
            <h2 className={styles.title}>My Team</h2>
            <ul className={styles.namesList}>
              {users.map(({firstName, lastName, _id}, i) => (
                <li key={i} className={styles.nameItem}>
                  <div className={styles.initials}>
                    <Initials
                      firstName={firstName}
                      lastName={lastName}
                      bgColor="Secondary"
                      borderColor="Secondary"
                      textColor="White"
                    />
                  </div>
                  <p className={styles.name}>{firstName + ' ' + lastName}</p>
                  <Link className={styles.viewMember} to={`/framework/employees/${_id}`}>
                    view team member
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <div className={styles.viewArchivedContainer}>
          <Link to={`/framework/employees/archived`} className={styles.viewArchivedLink}>
            View Archived Employees
          </Link>
        </div>
      </div>

      {checkPermission(['READ_EMPLOYEE', 'WRITE_EMPLOYEE'], permissions) && (
        <div className={styles.newEmployeeContainer}>
          <h2 className={styles.inputTitle}>Create New Employee</h2>
          <div className={styles.inputContainer}>
            <div className={styles.inputGrid}>
              <InputField
                placeholder="First Name"
                value={emp.first}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmp({...emp, first: e.target.value});
                }}
                align={'center'}
                width={'medium'}
                height={'large'}
              />
              <InputField
                placeholder="Last Name"
                value={emp.last}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmp({...emp, last: e.target.value});
                }}
                align={'center'}
                width={'medium'}
                height={'large'}
              />
              <InputField
                placeholder="Email Address"
                value={emp.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmp({...emp, email: e.target.value});
                }}
                align={'center'}
                width={'medium'}
                height={'large'}
              />
              <InputField
                placeholder="Title"
                value={emp.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmp({...emp, title: e.target.value});
                }}
                align={'center'}
                width={'medium'}
                height={'large'}
              />
              <div className={styles.blankCell} />
              <div>
                <Dropdown
                  options={options}
                  onChange={(e) => {
                    setEmp({
                      ...emp,
                      supervisor: options.find((o) => o.name === (e.target as HTMLSelectElement).value)
                        ?.id as string,
                    });
                  }}
                  value={options.find((o) => o.id === emp.supervisor)?.name ?? 'Supervisor'}
                  align={'center'}
                  width={'medium'}
                  height={'large'}
                />
              </div>
            </div>

            <div className={styles.addButton}>
              <Button
                id="add"
                onClick={() => {
                  dispatch(addEmployee(emp));
                  setEmp(initForm);
                }}
                color="success"
                disabled={!isFilled || !isValidEmail}>
                Add
              </Button>
              {(!isFilled || !isValidEmail) && (
                <Tooltip
                  content={
                    <ul className={styles.tooltipList}>
                      {!isFilled && <li>Complete all fields</li>}
                      {emp.email.trim() !== '' && !isValidEmail && <li>Invalid email format</li>}
                    </ul>
                  }
                  color="orange"
                  position="top">
                  <i className={combineClasses(styles.tooltip, 'fas fa-circle-exclamation')} />
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
