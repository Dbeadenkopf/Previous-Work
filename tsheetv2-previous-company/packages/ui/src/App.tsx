import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {logout, setUser, updateTimezone} from '@actions/auth';
import {getRejectedTimesheets} from '@actions/timesheet';
import BackButton from '@components/BackButton';
import Button from '@components/Button';
import Modal from '@components/Modal';
import NameBar from '@components/NameBar';
import Navbar from '@components/Navbar';
import PrivateRoute from '@components/PrivateRoute';
import Spinner from '@components/Spinner';
import Tabnav from '@components/Tabnav';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectLogoutStatus, selectPermissions, selectUser} from '@selectors/auth';
import {selectEmployee} from '@selectors/framework';
import {selectResubmitTimesheetRequest, selectSelected} from '@selectors/timesheet';
import checkPermission from '@util/checkPermission';

import ApprovalDetails from './pages/Approvals/ApprovalDetails';
import Approved from './pages/Approvals/Approved';
import Unapproved from './pages/Approvals/Unapproved';
import DevLogin from './pages/DevLogin';
import Employees from './pages/Framework/Employees';
import ArchivedEmployees from './pages/Framework/Employees/ArchivedEmployees';
import EmployeeDetails from './pages/Framework/Employees/EmployeeDetails';
import Projects from './pages/Framework/Projects';
import ProjectDetails from './pages/Framework/Projects/ProjectDetails';
import Roles from './pages/Framework/Roles';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Reports from './pages/Reports';
import ReportDetails from './pages/Reports/ReportDetails';
import Timesheet from './pages/Timesheet';
import SelectWeek from './pages/Timesheet/SelectWeek';

const authorized = () => {
  const exp = localStorage.getItem('exp');
  return (
    !!(exp && localStorage.getItem('signature') && localStorage.getItem('userId')) &&
    parseInt(exp, 10) > new Date().getTime()
  );
};

const App = () => {
  const dispatch = useAppDispatch();
  const {_id: userId, timezone, notifications} = useAppSelector(selectUser);

  // set user when browser refreshed
  useEffect(() => {
    if (authorized() && !userId) {
      dispatch(setUser(localStorage.getItem('userId')));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const browserTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timezone && timezone !== browserTZ && authorized()) {
      dispatch(updateTimezone({notifications, timezone: browserTZ}));
    }
  }, [timezone, dispatch, notifications]);

  // navigate user to login when unauthorized
  if (!authorized()) {
    return (
      <Routes>
        <Route
          path="login"
          element={process.env.TIMESHEET_MODE === 'production' ? <Login /> : <DevLogin />}
        />
        <Route path="*" element={<Navigate replace to="login" />} />
      </Routes>
    );
  }

  // navigate user to app content when their data has been fetched
  if (userId) {
    return <AppContent />;
  }

  return <Spinner />;
};

const AppContent = () => {
  const dispatch = useAppDispatch();

  const timesheet = useAppSelector(selectSelected);
  const resubmitTimesheetRequest = useAppSelector(selectResubmitTimesheetRequest);
  const {_id: userId} = useAppSelector(selectUser);
  const employee = useAppSelector(selectEmployee);
  const logoutStatus = useAppSelector(selectLogoutStatus);
  const permissions = useAppSelector(selectPermissions);

  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(5);

  const hasTimesheetPermission = checkPermission(['READ_TIMESHEET', 'WRITE_TIMESHEET'], permissions);
  const hasApprovalsPermission = checkPermission(['READ_REVIEW', 'WRITE_REVIEW'], permissions);
  const hasEmployeesPermission = checkPermission(['READ_EMPLOYEE'], permissions);
  const hasProjectsPermission = checkPermission(['READ_PROJECT', 'WRITE_PROJECT'], permissions);
  const hasRolesPermission = checkPermission(['READ_ROLE', 'WRITE_ROLE'], permissions);
  const hasFrameworkPermission = hasEmployeesPermission || hasProjectsPermission || hasRolesPermission;
  const hasReportsPermission = checkPermission(['READ_REPORT'], permissions);

  const frameworkTabs = [];

  if (hasEmployeesPermission) {
    frameworkTabs.push({to: '/framework/employees', label: 'Employees'});
  }

  if (hasProjectsPermission) {
    frameworkTabs.push({to: '/framework/projects', label: 'Projects'});
  }

  if (hasRolesPermission) {
    frameworkTabs.push({to: '/framework/roles', label: 'Roles'});
  }

  useEffect(() => {
    if (showModal) {
      const timerId = setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [showModal, time]);

  // check token expiration every 2 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const interval = setInterval(() => {
      if (!authorized()) {
        setShowModal(true);
        timeout = setTimeout(() => {
          if (!authorized()) {
            dispatch(logout());
          }
        }, 5000);
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRejectedTimesheets({createdBy: userId as string}));
  }, [dispatch, userId, resubmitTimesheetRequest.success]);

  useEffect(() => {
    if (logoutStatus.error) {
      localStorage.clear();
      location.reload();
    }
  }, [logoutStatus.error]);

  return (
    <Navbar
      showTimesheet={hasTimesheetPermission}
      showApprovals={hasApprovalsPermission}
      showFramework={hasFrameworkPermission}
      showReports={hasReportsPermission}>
      <NameBar />
      <Routes>
        {['', 'login'].map((path) => (
          <Route path={path} element={<Navigate replace to="/timesheet" />} key={path} />
        ))}
        <Route
          path="timesheet"
          element={Tabnav(
            [
              {to: '/timesheet', label: 'This Week'},
              {to: '/timesheet/select-week', label: 'Select Week'},
            ],
            <PrivateRoute hasPermission={hasTimesheetPermission} />
          )}>
          <Route index element={<Timesheet />} />
          <Route path="select-week" element={<SelectWeek />} />
        </Route>
        <Route
          path="approvals"
          element={Tabnav(
            [
              {to: '/approvals/unapproved', label: 'Unapproved'},
              {to: '/approvals/approved', label: 'Approved'},
            ],
            <PrivateRoute hasPermission={hasApprovalsPermission} />
          )}>
          <Route path="" element={<Navigate replace to="unapproved" />} />
          <Route path="unapproved" element={<Unapproved />} />
          <Route path="approved" element={<Approved />} />
          <Route
            path=":_id"
            element={BackButton(
              !timesheet.approved ? [{to: '/approvals/unapproved'}] : [{to: '/approvals/approved'}],
              <ApprovalDetails />
            )}
          />
        </Route>
        <Route
          path="framework"
          element={Tabnav(frameworkTabs, <PrivateRoute hasPermission={hasFrameworkPermission} />)}>
          <Route
            path=""
            element={
              <Navigate
                replace
                to={
                  hasEmployeesPermission
                    ? 'employees'
                    : hasProjectsPermission
                    ? 'projects'
                    : hasRolesPermission
                    ? 'roles'
                    : ''
                }
              />
            }
          />
          <Route path="employees" element={<PrivateRoute hasPermission={hasEmployeesPermission} />}>
            <Route index element={<Employees />} />
            <Route
              path=":_id"
              element={BackButton(
                !employee.removed ? [{to: '/framework/employees'}] : [{to: '/framework/employees/archived'}],
                <EmployeeDetails />
              )}
            />
            <Route
              path="archived"
              element={BackButton([{to: '/framework/employees'}], <ArchivedEmployees />)}
            />
          </Route>
          <Route path="projects" element={<PrivateRoute hasPermission={hasProjectsPermission} />}>
            <Route index element={<Projects />} />
            <Route path=":_id" element={BackButton([{to: '/framework/projects'}], <ProjectDetails />)} />
          </Route>
          <Route path="roles" element={<PrivateRoute hasPermission={hasRolesPermission} />}>
            <Route index element={<Roles />} />
          </Route>
        </Route>
        <Route path="reports" element={<PrivateRoute hasPermission={hasReportsPermission} />}>
          <Route index element={<Reports />} />
          <Route path=":_id" element={BackButton([{to: '/reports'}], <ReportDetails />)} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {showModal && (
        <Modal
          title="Session Expired"
          close={() => {
            dispatch(logout());
          }}>
          <p>You are about to be logged out in {time} seconds.</p>
          <Button onClick={() => dispatch(logout())}>OK</Button>{' '}
        </Modal>
      )}
    </Navbar>
  );
};

export default App;
