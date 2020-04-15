import * as React from 'react';
import { getSessionCookie } from 'common/cookies';

const user = getSessionCookie();

const trainerComponents = [
  'ManageRoutinesComponent',
  'displayClientInfoComponent',
  'ClientsContainerComponent',
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
