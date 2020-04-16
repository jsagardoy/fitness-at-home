import * as React from 'react';
import { getSessionCookie } from 'common/cookies';
import Typography from '@material-ui/core/Typography';

const user = getSessionCookie();

const trainerComponents = [
  'ManageRoutinesComponent',
  'displayClientInfoComponent',
  'ClientsContainerComponent',
  'ClientsListContainerComponent',
];
const clientComponents = ['displayClientInfoComponent'];

export const hasPermision = (componentName: string): boolean => {
  switch (user.loginInfo.rol) {
    case 'trainer':
      return trainerComponents.includes(componentName);
      break;
    case 'client':
      return clientComponents.includes(componentName);
      break;
    default:
      return false;
      break;
  }
};

export const AccessDeniedComponent: React.FC<{}> = () => (
  <Typography component='p' style={{ color: 'red' }}>
    Access denied.
  </Typography>
);
