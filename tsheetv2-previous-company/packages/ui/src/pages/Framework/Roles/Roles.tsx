import React, {useEffect, useState} from 'react';

import {deleteRole, getRoles} from '@actions/framework';
import AddRemoveButton from '@components/AddRemoveButton/AddRemoveButton';
import Button from '@components/Button';
import ConfirmationModal from '@components/ConfirmationModal';
import RoleModal from '@components/RoleModal';
import Table, {Column} from '@components/Table';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectDeleteRoleRequest, selectEditRoleRequest, selectRoles} from '@selectors/framework';

import styles from './Roles.module.scss';

const Roles = () => {
  const dispatch = useAppDispatch();

  const roles = useAppSelector(selectRoles);
  const deleteRoleRequest = useAppSelector(selectDeleteRoleRequest);
  const editRoleRequest = useAppSelector(selectEditRoleRequest);

  const [currentId, setCurrentId] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteModalConfirm = () => {
    setShowDeleteModal(!showDeleteModal);
    dispatch(deleteRole(currentId));
  };

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch, deleteRoleRequest.success, editRoleRequest.success]);

  const columns: Column[] = [
    {
      key: 'info',
      header: 'Info',
      hideHeader: true,
      width: 200,
    },
    {
      key: 'editAndDelete',
      header: 'Edit and Delete',
      hideHeader: true,
      width: 200,
      align: 'right',
    },
  ];

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Schemas.Role | null>(null);

  const showAddRoleModal = () => {
    setShowAddModal(true);
    setSelectedRole(null);
  };

  const defaultRoles = [
    'Timesheet Writer',
    'Review Writer',
    'Employee Reader',
    'Employee Writer',
    'Project Writer',
    'Role Writer',
    'Report Reader',
  ];

  const showEditRoleModal = (
    name: string,
    description: string,
    permissions: string[],
    roleIdString: string
  ) => {
    setShowAddModal(true);
    setSelectedRole({name, description, permissions, _id: roleIdString});
  };

  useEffect(() => {
    setShowAddModal(false);
  }, [roles]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h2>
          <strong>{'Roles (' + roles.length + ')'}</strong>
        </h2>
        <div>
          <Table
            columns={columns}
            data={roles.map((r) => ({
              info: (
                <span>
                  <span className={styles.info}>
                    <p className={styles.infoName}>
                      <strong>{r.name}</strong>
                    </p>
                    <p className={styles.infoDescription}>{r.description}</p>
                  </span>
                  <ul className={styles.infoPermissions}>
                    {r.permissions.map((p, i) => (
                      <li key={i}>{p.replaceAll('_', ' ').toLowerCase()}</li>
                    ))}
                  </ul>
                </span>
              ),
              editAndDelete: (
                <div className={styles.editRole}>
                  <Button
                    onClick={() => showEditRoleModal(r.name, r.description ?? '', r.permissions, r._id ?? '')}
                    disabled={defaultRoles.includes(r.name)}>
                    Edit Role
                  </Button>
                  <AddRemoveButton
                    type="remove"
                    className={styles.delete}
                    size="fa-xl"
                    hover={true}
                    disabled={defaultRoles.includes(r.name)}
                    onClick={() => {
                      setCurrentId(r._id as string);
                      setShowDeleteModal(!showDeleteModal);
                    }}
                  />
                </div>
              ),
            }))}
            wrapContent={true}
            divider={false}
          />
        </div>
        <AddRemoveButton
          type="add"
          onClick={() => showAddRoleModal()}
          className={styles.newRole}
          label="Add New Role"
          size="fa-xl"
        />
        {showDeleteModal && (
          <ConfirmationModal
            title="Delete Role"
            close={() => setShowDeleteModal(!showDeleteModal)}
            handleModalConfirm={handleDeleteModalConfirm}
            action={'delete this role'}
          />
        )}{' '}
        {showAddModal && (
          <RoleModal
            close={() => {
              setShowAddModal(!showAddModal);
            }}
            selectedRole={selectedRole as Schemas.Role}
          />
        )}
      </div>
    </div>
  );
};

export default Roles;
