import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {addProject, getProjects, getUsers} from '@actions/framework';
import AddRemoveButton from '@components/AddRemoveButton/AddRemoveButton';
import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import InputField from '@components/InputField';
import Modal from '@components/Modal';
import Table, {Column} from '@components/Table';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectAddProjectRequest, selectProjects, selectUsers} from '@selectors/framework';
import combineClasses from '@t1cg/combine-classes';

import styles from './Projects.module.scss';

const Projects = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  const users = useAppSelector(selectUsers);
  const addProjectRequest = useAppSelector(selectAddProjectRequest);

  const [showModal, setShowModal] = useState(false);
  const [newProjectInfo, setNewProjectInfo] = useState({label: '', lead: '', name: ''});

  useEffect(() => {
    if (showModal) {
      dispatch(getUsers());
    }
  }, [dispatch, showModal]);

  useEffect(() => {
    if (addProjectRequest.success) {
      setShowModal(false);
      setNewProjectInfo({label: '', lead: '', name: ''});
    }
  }, [dispatch, addProjectRequest.success]);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const activeProjects = projects.filter((project) => !project.removed);
  const archivedProjects = projects.filter((project) => project.removed);

  const columns: Column[] = [
    {
      key: 'label',
      header: 'Label',
      hideHeader: true,
      width: 15,
      align: 'right',
    },
    {
      key: 'name',
      header: 'Name',
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
    <div className={styles.projects}>
      <h2 className={styles.title}>Active Projects ({activeProjects.length})</h2>
      {activeProjects.length > 0 && (
        <Table
          columns={columns}
          data={activeProjects.map(({_id, label, name}) => ({
            label: (
              <span className={combineClasses(styles.projectLogo, 'fa-stack')}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <strong className={combineClasses(styles.logoText, 'fa-stack-1x calendar-text')}>
                  {label}
                </strong>
              </span>
            ),
            name: (
              <div>
                <b>{label}</b> <br />
                {name}
              </div>
            ),
            button: (
              <Link
                className={styles.viewProjectBtn}
                to={`/framework/projects/${_id}`}
                style={{textDecoration: 'none'}}>
                <Button>View Project</Button>
              </Link>
            ),
          }))}
          wrapContent={true}
          divider={false}
        />
      )}

      <AddRemoveButton
        type="add"
        onClick={() => {
          setShowModal(!showModal);
        }}
        label="Add New Project"
        className={styles.addNewProject}
        fontColor="secondary"
        buttonColor="secondary"
        size="fa-xl"
      />

      {/* Add new project modal */}
      {showModal && (
        <Modal
          title="New Project"
          close={() => {
            setShowModal(!showModal);
          }}>
          <div className={styles.newProjectInfo}>
            <div className={styles.inputField}>
              <InputField
                label="Enter Name:"
                labelPos={'top'}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setNewProjectInfo({...newProjectInfo, name: e.target.value});
                }}
                value={newProjectInfo.name}
                width="medium"
                height="large"
              />
            </div>
            <div className={styles.inputField}>
              <InputField
                label="Enter Label:"
                labelPos={'top'}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setNewProjectInfo({...newProjectInfo, label: e.target.value});
                }}
                value={newProjectInfo.label}
                maxLength={3}
                width="medium"
                height="large"
              />
            </div>
            <div className={styles.leadDropdown}>
              <Dropdown
                options={users.map((user) => ({
                  id: user._id as string,
                  name: `${user.firstName} ${user.lastName}`,
                }))}
                onChange={(e) => {
                  const [firstName, lastName] = (e.target as HTMLSelectElement).value.split(' ');
                  setNewProjectInfo({
                    ...newProjectInfo,
                    lead: users.find(
                      (element) => element.firstName === firstName && element.lastName === lastName
                    )?._id as string,
                  });
                }}
                label="Select Lead:"
                labelPos="top"
                blank={true}
                width="medium"
                height="large"
              />
            </div>
            <div className={styles.addButtonContainer}>
              <Button
                onClick={() => dispatch(addProject(newProjectInfo))}
                className={styles.addProjectButton}
                disabled={!newProjectInfo.label || !newProjectInfo.lead || !newProjectInfo.name}>
                Add Project
              </Button>{' '}
            </div>
          </div>
        </Modal>
      )}

      <h2 className={styles.title}>Archived Projects ({archivedProjects.length})</h2>
      {archivedProjects.length > 0 && (
        <Table
          columns={columns}
          data={archivedProjects.map(({_id, label, name}) => ({
            label: (
              <span className={combineClasses(styles.projectLogo, 'fa-stack')}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <strong className={combineClasses(styles.logoText, 'fa-stack-1x calendar-text')}>
                  {label}
                </strong>
              </span>
            ),
            name: (
              <div className={styles.projectDesc}>
                <b>{label}</b> <br />
                {name}
              </div>
            ),
            button: (
              <Link to={`/framework/projects/${_id}`} style={{textDecoration: 'none'}}>
                <Button>View Project</Button>
              </Link>
            ),
          }))}
          divider={false}
        />
      )}
    </div>
  );
};

export default Projects;
