import {
  Dashboard,
  Person,
  Code,
  Equalizer,
  Assignment,
  School,
  Event,
  ShowChart
} from '@material-ui/icons';
import DashboardPage from '../views/Dashboard/Dashboard';

import Formation from '../views/Formation/Formation';
import Project from '../views/Projects/Projects';
import Skill from '../views/Skill/Skill';
import Education from '../views/Education/Education';
import Certifications from '../views/Certifications/Certifications';
import Objectifs from '../views/Objectifs/Objectifs';
import Calendar from '../views/Calendar/Data';
import Profile from '../views/UserProfile/UserProfile';
export type Route = typeof dashboardRoutes[0];
const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: '/formation',
    sidebarName: 'Formation',
    navbarName: 'Formation',
    icon: Assignment,
    component: Formation
  },
  {
    path: '/projects',
    sidebarName: 'Projects',
    navbarName: 'Projects',
    icon: Equalizer,
    component: Project
  },
  {
    path: '/skills',
    sidebarName: 'Skills',
    navbarName: 'Skills',
    icon: Code,
    component: Skill
  },
  {
    path: '/certifications',
    sidebarName: 'Certifications',
    navbarName: 'Certifications',
    icon: Person,
    component: Certifications
  },
  {
    path: '/objectifs',
    sidebarName: 'Objectifs',
    navbarName: 'Objectifs',
    icon: ShowChart,
    component: Objectifs
  },
  {
    path: '/education',
    sidebarName: 'Education',
    navbarName: 'Education',
    icon: School,
    component: Education
  },
  {
    path: '/Calendar',
    sidebarName: 'Calendar',
    navbarName: 'Calendar',
    icon: Event,
    component: Calendar
  },
  {
    path: '/user',

    component: Profile
  },
  {
    path: '/',
    navbarName: 'Redirect',
    redirect: true,
    to: '/dashboard'
  }
];

export default dashboardRoutes;
