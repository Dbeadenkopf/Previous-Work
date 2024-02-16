import Project from '../../../mongoose/models/project';

import {prevWeekStart} from './dates';
import {projectIds} from './ids';

interface Leads {
  aaron: string;
  dicky: string;
  jesse: string;
  peter: string;
  phillip: string;
}

const projectSeed = ({aaron, dicky, jesse, peter, phillip}: Leads) => [
  new Project({
    _id: projectIds.isp,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: jesse,
    },
    label: 'ISP',
    lead: jesse,
    name: 'Innovation Support Platform',
    subProjects: [
      {
        label: 'CDX',
        name: 'Centralized Data Exchange',
      },
      {
        label: 'EDFR',
        name: 'Data Feedback Reporting',
      },
      {
        label: 'HDR',
        name: 'Health Data Reporting',
      },
    ],
  }),
  new Project({
    _id: projectIds.ams,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: dicky,
    },
    label: 'AMS',
    lead: dicky,
    name: 'Analysis and Management System',
  }),
  new Project({
    _id: projectIds.tt,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: aaron,
    },
    label: 'TT',
    lead: aaron,
    name: 'Timesheet',
  }),
  new Project({
    _id: projectIds.ai,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: dicky,
    },
    label: 'AI',
    lead: dicky,
    name: 'AMS Info Dashboard',
  }),
  new Project({
    _id: projectIds.bz,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: jesse,
    },
    label: 'BZ',
    lead: jesse,
    name: 'Beauty Zone',
  }),
  new Project({
    _id: projectIds.ob,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: dicky,
    },
    label: 'OB',
    lead: dicky,
    name: 'Onboarding',
  }),
  new Project({
    _id: projectIds.tf,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: phillip,
    },
    label: 'TF',
    lead: phillip,
    name: 'Forum',
  }),
  new Project({
    _id: projectIds.ti,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: dicky,
    },
    label: 'TI',
    lead: dicky,
    name: 'T1cg.io',
  }),
  new Project({
    _id: projectIds.hf,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: phillip,
    },
    label: 'HF',
    lead: phillip,
    name: 'Hyperledger Fabric',
  }),
  new Project({
    _id: projectIds.admin,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: peter,
    },
    label: 'Admin',
    lead: peter,
    name: 'Admin',
  }),
  new Project({
    _id: projectIds.outing,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: aaron,
    },
    label: 'Outing',
    lead: aaron,
    name: 'Outing',
  }),
  new Project({
    _id: projectIds.dt,
    created: {
      date: prevWeekStart,
      ip: '0.0.0.0',
      user: dicky,
    },
    label: 'DT',
    lead: dicky,
    name: 'DevSecOps Training',
  }),
];

export default projectSeed;
