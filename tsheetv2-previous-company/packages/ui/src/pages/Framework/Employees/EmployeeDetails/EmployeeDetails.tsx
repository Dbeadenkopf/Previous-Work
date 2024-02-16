import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {
  editEmployee,
  getEmployeeById,
  getRoles,
  reactivateEmployee,
  removeEmployee,
  resetReactivateEmployeeRequest,
  resetRemoveEmployeeRequest,
} from '@actions/framework';
import AddRemoveButton from '@components/AddRemoveButton';
import Button from '@components/Button';
import ConfirmationModal from '@components/ConfirmationModal';
import Initials from '@components/Initials';
import InputField from '@components/InputField';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectPermissions} from '@selectors/auth';
import {
  selectEmployee,
  selectReactivateEmployeeRequest,
  selectRemoveEmployeeRequest,
  selectRoles,
} from '@selectors/framework';
import checkPermission from '@util/checkPermission';

import styles from './EmployeeDetails.module.scss';

const EmployeeDetails = () => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const empId = params._id as string;
  const navigate = useNavigate();

  const [showRemoveModal, setRemoveModal] = useState(false);
  const [showActivateModal, setActivateModal] = useState(false);

  const employee = useAppSelector(selectEmployee);
  const allRoles = useAppSelector(selectRoles);
  const removeEmployeeRequest = useAppSelector(selectRemoveEmployeeRequest);
  const reactivateEmployeeRequest = useAppSelector(selectReactivateEmployeeRequest);
  const permissions = useAppSelector(selectPermissions);

  const empFirstName = employee.firstName;
  const empLastName = employee.lastName;
  const empRoles = employee.roles;
  const empEmail = employee.email;
  const empTitle = employee.title;
  const empSlack = employee.slackId;
  const canEdit = checkPermission(['READ_EMPLOYEE', 'WRITE_EMPLOYEE'], permissions);

  const [title, setTitle] = React.useState(empTitle);
  const [titleEditable, setTitleEditable] = React.useState(false);

  useEffect(() => {
    dispatch(getEmployeeById(empId));
    dispatch(getRoles());
  }, [dispatch, empId, empTitle]);

  useEffect(() => {
    if (removeEmployeeRequest.success || reactivateEmployeeRequest.success) {
      navigate('/framework/employees');
    }
    return () => {
      removeEmployeeRequest.success
        ? dispatch(resetRemoveEmployeeRequest())
        : dispatch(resetReactivateEmployeeRequest());
    };
  }, [dispatch, navigate, removeEmployeeRequest.success, reactivateEmployeeRequest.success]);

  const mapEmployeeRoles = () =>
    empRoles.map((r) => (
      <li key={r._id} className={styles.rolesSpacing}>
        {r.name}{' '}
        {canEdit && (
          <AddRemoveButton
            type="remove"
            onClick={() => {
              dispatch(
                editEmployee({
                  userId: empId,
                  roles: empRoles.filter((q) => q._id !== r._id),
                })
              );
            }}
            size="fa-xl"
            className={styles.deleteRole}
            hover={true}
            disabled={r.name === 'Timesheet Writer'}
          />
        )}
        <ul className={styles.permissions}>
          {r.permissions.map((p, i) => (
            <li key={i}>{p.replace('_', ' ')}</li>
          ))}
        </ul>
      </li>
    ));

  const mapAvailableRoles = () => {
    const empRoleIds: string[] = [];
    for (const i in empRoles) {
      empRoleIds.push(empRoles[i]._id as string);
    }
    return allRoles
      .filter((role) => !empRoleIds.includes(role._id as string))
      .map((r, index) => (
        <li key={index} className={styles.rolesSpacingWithPlus}>
          <AddRemoveButton
            type="add"
            onClick={() => {
              dispatch(editEmployee({userId: empId, roles: [...empRoles, r]}));
            }}
            size="fa-xl"
            hover={true}
          />
          {r.name}
          <ul className={styles.permissions}>
            {r.permissions.map((p, i) => (
              <li className={styles.allRolesPermissionsLi} key={i}>
                {p.replace('_', ' ')}
              </li>
            ))}
          </ul>
        </li>
      ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.topLine}>
        <h3 className={styles.bolded}>Team Member:</h3>
        <Initials firstName={empFirstName} lastName={empLastName} />
        <div className={styles.nameAndEmail}>
          <h4 className={styles.name}>{empFirstName + ' ' + empLastName}</h4>
          <h5 className={styles.gridItem}>{empEmail}</h5>
        </div>
      </div>

      {canEdit ? (
        <>
          <div className={styles.details}>
            <div className={styles.infoHeader}>
              <h4 className={styles.bolded}>Employee Title: </h4>
              {titleEditable ? (
                <div className={styles.empTitleInputContainer}>
                  <InputField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    defaultValue={empTitle}
                    height="medium"
                  />
                </div>
              ) : (
                <h4 className={styles.employeeTitle}>{empTitle}</h4>
              )}

              <div className={styles.saveButtonContainer}>
                {titleEditable ? (
                  <Button
                    onClick={() => {
                      dispatch(editEmployee({userId: empId, title}));
                      setTitleEditable(false);
                    }}>
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => setTitleEditable(true)}>Edit</Button>
                )}
              </div>
            </div>
            <div className={styles.rolesFlex}>
              <h4 className={styles.infoHeader}>Assigned Roles:</h4>
              <div className={styles.assignedEmpRolesContainer}>
                <ul className={styles.rolesList}>{mapEmployeeRoles()}</ul>
              </div>
            </div>
            <div className={styles.rolesFlex}>
              <h4 className={styles.infoHeader}>Available Roles:</h4>

              <div className={styles.availableEmpRolesContainer}>
                <ul className={styles.allRolesUl}>{mapAvailableRoles()}</ul>
              </div>
            </div>
            <div className={styles.infoHeader}>
              <h4 className={styles.bolded}>Slack Id:</h4>
              <h4 className={styles.slackId}>{empSlack ? empSlack : 'N/A'}</h4>
            </div>
          </div>
          {!employee.removed ? (
            <div className={styles.removeEmployeeContainer}>
              <p className={styles.removeText}>Remove user from organization?</p>
              <Button onClick={() => setRemoveModal(!showRemoveModal)} color={'danger'}>
                Remove
              </Button>
            </div>
          ) : (
            <div className={styles.removeEmployeeContainer}>
              <p className={styles.removeText}>Activate Employee?</p>
              <Button onClick={() => setActivateModal(!showActivateModal)} color={'success'}>
                Activate
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.details}>
          <div className={styles.infoHeader}>
            <h4 className={styles.bolded}>Employee Title: </h4>
            <h4 className={styles.employeeTitle}>{empTitle}</h4>
          </div>
          <div className={styles.rolesFlex}>
            <h4 className={styles.infoHeader}>Assigned Roles:</h4>
            <ul className={styles.rolesList}>{mapEmployeeRoles()}</ul>
          </div>
        </div>
      )}

      {showRemoveModal && (
        <ConfirmationModal
          close={() => setRemoveModal(!showRemoveModal)}
          handleModalConfirm={() => dispatch(removeEmployee(empId))}
          action={`remove ${empFirstName} ${empLastName}`}
        />
      )}

      {showActivateModal && (
        <ConfirmationModal
          close={() => setActivateModal(!showActivateModal)}
          handleModalConfirm={() => dispatch(reactivateEmployee(empId))}
          action={`activate ${empFirstName} ${empLastName}`}
        />
      )}
    </div>
  );
};

export default EmployeeDetails;
