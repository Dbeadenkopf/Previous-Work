import React, {useEffect, useState} from 'react';

import {addRole, editRole} from '@actions/framework';
import AddRemoveButton from '@components/AddRemoveButton';
import Button from '@components/Button';
import InputField from '@components/InputField';
import Modal, {ModalProps} from '@components/Modal';
import {useAppDispatch} from '@hooks';
import combineClasses from '@t1cg/combine-classes';

import styles from './RoleModal.module.scss';

interface IProps {
  selectedRole?: Schemas.Role;
}

const RoleModal: React.FC<IProps & ModalProps> = ({close, selectedRole}) => {
  const dispatch = useAppDispatch();
  const [permissionName, setPermissionName] = useState('');
  const [localRole, setLocalRole] = useState(
    selectedRole ?? {name: '', description: '', permissions: [] as string[]}
  );

  const disableButton = () =>
    !localRole.name ||
    !localRole.description ||
    !localRole.permissions ||
    (localRole.permissions && localRole.permissions.length === 0);

  const deletePermissionFunc = (d: string) => {
    const deleteRoleName = localRole?.permissions.filter((deletedRole) => deletedRole !== d);

    setLocalRole({...localRole, permissions: deleteRoleName});
  };

  const permissionItems = localRole.permissions.map((d) => (
    <li key={d}>
      <span className={styles.permissionItem}>{d}</span>
      <AddRemoveButton type="remove" onClick={() => deletePermissionFunc(d)} hover={true} />
    </li>
  ));

  useEffect(() => {
    setPermissionName('');
  }, [selectedRole, setPermissionName]);

  return (
    <Modal title={selectedRole ? 'Edit Role' : 'Add New Role'} close={close}>
      <hr />
      <div className={styles.inputsContainer}>
        <div className={styles.singleInputContainer}>
          <InputField
            label={'Name:'}
            name={'name'}
            labelPos={'top'}
            defaultValue={selectedRole?.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLocalRole({...localRole, name: e.target.value})
            }
            maxLength={25}
            width="medium"
            height="large"
          />
          <br />
        </div>
        <div className={styles.singleTextAreaContainer}>
          <InputField
            label={'Description:'}
            multi={true}
            name={'description'}
            labelPos={'top'}
            rows={4}
            maxLength={90}
            defaultValue={selectedRole?.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLocalRole({...localRole, description: e.target.value})
            }
            width="medium"
            height="large"
          />
          <br />
        </div>
      </div>
      <div className={styles.permissionsContainer}>
        <div className={styles.permissionsInputContainer}>
          <InputField
            label={'Permissions:'}
            name={'permissionName'}
            labelPos={'top'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPermissionName(e.target.value)}
            maxLength={35}
            value={permissionName}
            width="medium"
            height="medium"
          />
          <i
            className={combineClasses(
              'fa fa-circle-plus fa-xl',
              (permissionName &&
                (selectedRole === null ||
                  (selectedRole && !selectedRole?.permissions) ||
                  (selectedRole && selectedRole?.permissions && selectedRole?.permissions.length === 0))) ||
                (permissionName &&
                  selectedRole &&
                  selectedRole?.permissions &&
                  !selectedRole?.permissions.includes(permissionName?.replace(/\s/g, '_').toUpperCase()))
                ? styles.addPermission
                : styles.addPermissionDisabled
            )}
            onClick={() => {
              setLocalRole({
                ...localRole,
                permissions: [...localRole.permissions, permissionName.replace(/\s/g, '_').toUpperCase()],
              });
              setPermissionName('');
            }}
          />
        </div>

        <div>
          <div className={styles.permissionList}>{permissionItems}</div>
        </div>
        {selectedRole ? (
          <div className={styles.submitBtn}>
            <Button
              onClick={() => {
                dispatch(
                  editRole({
                    name: localRole.name.trim(),
                    description: localRole.description?.trim() as string,
                    permissions: localRole.permissions,
                    roleId: selectedRole?._id,
                  })
                );
              }}
              disabled={disableButton()}>
              Edit Role
            </Button>
          </div>
        ) : (
          <div className={styles.submitBtn}>
            <Button
              onClick={() => {
                dispatch(
                  addRole({
                    name: localRole.name.trim(),
                    description: localRole.description?.trim() as string,
                    permissions: localRole.permissions,
                  })
                );
              }}
              disabled={disableButton()}>
              Add Role
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RoleModal;
