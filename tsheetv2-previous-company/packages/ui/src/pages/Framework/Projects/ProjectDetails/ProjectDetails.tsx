import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {
  addSubProject,
  deleteSubProject,
  getContributorTimesheets,
  getProject,
  getUsers,
  resetUpdateProjectStatus,
  updateProject,
  updateProjectStatus,
} from '@actions/framework';
import AddRemoveButton from '@components/AddRemoveButton/AddRemoveButton';
import Button from '@components/Button';
import ConfirmationModal from '@components/ConfirmationModal';
import Dropdown from '@components/Dropdown';
import InputField from '@components/InputField';
import Modal from '@components/Modal';
import Spinner from '@components/Spinner';
import Table, {Column} from '@components/Table';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectUser} from '@selectors/auth';
import {
  selectAddSubProjectRequest,
  selectContributorTimesheets,
  selectDeleteSubProjectRequest,
  selectProject,
  selectProjectRequest,
  selectUpdateProjectRequest,
  selectUpdateProjectStatusRequest,
  selectUsers,
} from '@selectors/framework';
import combineClasses from '@t1cg/combine-classes';
import formatDate from '@util/formatDate';
import getPrevMonday from '@util/getPrevMonday';

import styles from './ProjectDetails.module.scss';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();

  const requestStatus = useAppSelector(selectProjectRequest);
  const updateProjectStatusRequest = useAppSelector(selectUpdateProjectStatusRequest);
  const addSubProjectRequest = useAppSelector(selectAddSubProjectRequest);
  const deleteSubProjectRequest = useAppSelector(selectDeleteSubProjectRequest);
  const updateProjectRequest = useAppSelector(selectUpdateProjectRequest);
  const userId = useAppSelector(selectUser)._id as string;
  const project = useAppSelector(selectProject);
  const timesheets = useAppSelector(selectContributorTimesheets);
  const users = useAppSelector(selectUsers);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [subLabel, setSubLabel] = useState('');
  const [subName, setSubName] = useState('');

  const projectId = params._id as string;
  const curProjectIsActive = !project.removed;
  const projectLabel = project.label;

  useEffect(() => {
    dispatch(getProject(projectId));
  }, [
    dispatch,
    projectId,
    deleteSubProjectRequest.success,
    addSubProjectRequest.success,
    updateProjectRequest.success,
  ]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (projectLabel) {
      dispatch(getContributorTimesheets({project: projectLabel, recent: curProjectIsActive}));
    }
  }, [dispatch, projectLabel, curProjectIsActive]);

  useEffect(() => {
    if (updateProjectStatusRequest.success) {
      navigate('/framework/projects');
    }
    return () => {
      dispatch(resetUpdateProjectStatus());
    };
  }, [dispatch, navigate, updateProjectStatusRequest.success]);

  const columns: Column[] = [
    {
      key: 'label',
      header: 'Label',
      hideHeader: true,
      width: 5,
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
      width: 20,
      align: 'center',
    },
  ];

  const contributorColumns: Column[] = [
    {
      key: 'name',
      header: 'Employee Name',
      align: 'center',
      bold: true,
    },
    {
      key: 'email',
      header: 'Email Address',
      align: 'center',
      bold: true,
    },
    {
      key: 'date',
      header: 'Date of Last Activity',
      align: 'center',
      bold: true,
    },
  ];

  const contributorInfo: {
    fName: string;
    lName: string;
    email: string;
    date: Date;
  }[] = [];

  const recentTimesheets = timesheets.reduce((filtered, ts) => {
    const index = filtered.findIndex((a) => a.created.user._id === ts.created.user._id);

    if (index === -1) {
      return [...filtered, ts];
    }

    if (filtered[index].weekOf < ts.weekOf) {
      filtered.splice(index, 1, ts);
    }

    return filtered;
  }, [] as Schemas.Timesheet[]);

  recentTimesheets.map((ts) => {
    let lastActivity = curProjectIsActive ? getPrevMonday() : new Date(project.created.date).toISOString();
    const dayArray = Object.values(ts.time) as Schemas.Day[];
    dayArray.map((day) => {
      day.hours.map((h) => {
        if (h.project.label === projectLabel && new Date(h.end) > new Date(lastActivity)) {
          lastActivity = h.end as string;
        }
      });
    });
    contributorInfo.push({
      fName: ts.created.user.firstName,
      lName: ts.created.user.lastName,
      email: ts.created.user.email,
      date: new Date(lastActivity),
    });
  });

  const clearSubProjectState = () => {
    setSubLabel('');
    setSubName('');
  };

  const handleArchiveModalConfirm = () => {
    if (curProjectIsActive) {
      dispatch(updateProjectStatus({projectId, userId, status: 'archived'}));
    } else {
      dispatch(updateProjectStatus({projectId, userId, status: 'active'}));
    }
  };

  const handleAddModalConfirm = () => {
    setShowAddModal(!showAddModal);
    dispatch(addSubProject({projectId, subLabel, subName, action: 'add'}));
    clearSubProjectState();
  };

  const handleDeleteModalConfirm = () => {
    dispatch(deleteSubProject({projectId, subLabel, subName, action: 'delete'}));
  };

  return (
    <>
      <div className={styles.projectContainer}>
        <h2 className={styles.bold}>Project:</h2>
        {requestStatus.fetching ? (
          <Spinner />
        ) : requestStatus.error ? (
          requestStatus.error
        ) : (
          <>
            <div className={styles.projectDetails}>
              <span className={combineClasses(styles.projectLogo, 'fa-stack')}>
                <i className={combineClasses(styles.projectLabel, 'fa fa-circle fa-stack-2x')}></i>
                <strong className={combineClasses(styles.logoText, 'fa-stack-1x calendar-text')}>
                  {project.label}
                </strong>
              </span>
              <div className={styles.projectInfo}>
                <h4 className={styles.projectLabel}>{project.label}</h4>
                <h4>{project.name}</h4> <br />
                <div>
                  <span className={styles.bold}>Status: </span>
                  <span className={curProjectIsActive ? styles.active : styles.archived}>
                    {curProjectIsActive ? 'Active' : 'Archived'}
                  </span>
                </div>
                <div className={styles.projectLead}>
                  <span className={styles.bold}>Project Lead: </span>
                  <Dropdown
                    value={`${project.lead.firstName} ${project.lead.lastName}`}
                    options={users.map((user) => ({
                      id: user._id as string,
                      name: `${user.firstName} ${user.lastName}`,
                    }))}
                    onChange={(e) => {
                      dispatch(
                        updateProject({
                          projectId,
                          lead: users.find(
                            (user) =>
                              `${user.firstName} ${user.lastName}` === (e.target as HTMLSelectElement).value
                          )?._id as string,
                        })
                      );
                    }}
                  />
                </div>
              </div>
              <div className={styles.subProjects}>
                <h3 className={styles.bold}>Sub-Projects ({project.subProjects?.length})</h3>
                {project.subProjects && project.subProjects.length > 0 && (
                  <Table
                    columns={columns}
                    data={project.subProjects?.map(({label, name}) => ({
                      label: (
                        <span className={combineClasses(styles.projectLogo, 'fa-stack')}>
                          <i
                            className={combineClasses(styles.subProjectLogo, 'fa fa-circle fa-stack-2x')}></i>
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
                      button: curProjectIsActive ? (
                        <AddRemoveButton
                          type="remove"
                          className={combineClasses(styles.removeProjectLogo, 'fa fa-circle-xmark lg')}
                          onClick={() => {
                            setSubLabel(label);
                            setSubName(name);
                            setShowDeleteModal(!showDeleteModal);
                          }}
                          buttonColor="warning"
                          size="fa-xl"
                        />
                      ) : null,
                    }))}
                    wrapContent={true}
                    divider={false}
                  />
                )}
              </div>
              {curProjectIsActive && (
                <div onClick={() => setShowAddModal(!showAddModal)} style={{margin: '16px'}}>
                  <AddRemoveButton
                    type="add"
                    label="Add New Sub-Project"
                    onClick={() => {}}
                    size="fa-xl"
                    fontColor="secondary"
                    className={styles.addNewSubProject}
                  />
                </div>
              )}
            </div>
            <div className={styles.projectContributors}>
              <h3>
                <strong>{`${curProjectIsActive ? 'Recent ' : ''}Contributors (${
                  contributorInfo.length
                })`}</strong>
              </h3>
              {recentTimesheets.length > 0 && (
                <Table
                  columns={contributorColumns}
                  data={contributorInfo.map((u) => ({
                    name: u.fName + ' ' + u.lName,
                    email: <span style={{wordBreak: 'break-word'}}>{u.email}</span>,
                    date: formatDate(u.date),
                  }))}
                  divider={false}
                  wrapContent={true}
                />
              )}
            </div>
            <section className={styles.archiveContainer}>
              <div>
                <b className={styles.archiveHeader}>
                  {curProjectIsActive ? 'Archive' : 'Activate'} {project.label}?
                </b>
              </div>

              <Button
                color={curProjectIsActive ? 'danger' : 'success'}
                onClick={() => setShowArchiveModal(!showArchiveModal)}>
                {curProjectIsActive ? 'Archive' : 'Activate'}
              </Button>
            </section>

            {/* --- MODALS --- */}

            {showAddModal && (
              <Modal
                title="New Sub-Project"
                close={() => {
                  setShowAddModal(!showAddModal);
                  clearSubProjectState();
                }}>
                <div className={styles.addSubProjectModalContainer}>
                  <div className={styles.addModalInputDiv}>
                    <InputField
                      value={subLabel}
                      maxLength={4}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSubLabel(e.target.value.toUpperCase());
                      }}
                      label="Enter Label:"
                      labelPos="top"
                      width="medium"
                      height="large"
                    />
                  </div>
                  <div className={styles.addModalInputDiv}>
                    <InputField
                      value={subName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSubName(e.target.value);
                      }}
                      label="Enter Name:"
                      labelPos="top"
                      width="medium"
                      height="large"
                    />
                  </div>
                  <div>
                    <Button onClick={handleAddModalConfirm} color="success" disabled={!subLabel || !subName}>
                      Add
                    </Button>
                  </div>
                </div>
              </Modal>
            )}

            {showDeleteModal && (
              <ConfirmationModal
                handleModalConfirm={handleDeleteModalConfirm}
                close={() => {
                  setShowDeleteModal(!showDeleteModal);
                  clearSubProjectState();
                }}
                action={`delete ${subLabel}`}
              />
            )}

            {showArchiveModal && (
              <ConfirmationModal
                handleModalConfirm={handleArchiveModalConfirm}
                close={() => setShowArchiveModal(!showArchiveModal)}
                action={`${curProjectIsActive ? 'archive' : 'activate'} ${project.label}`}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProjectDetails;
