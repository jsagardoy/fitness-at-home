import * as React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { ClientsListContainerComponent } from 'pods/clients';
import { ClientType, LoginType } from 'commonApp/interfaces';
import { clientAPI } from 'api/data.mock';
import { getSessionCookie } from 'common/cookies';
import { AccessDeniedComponent, hasPermision } from 'commonApp/components';

export const ClientsContainerComponent = () =>
  hasPermision('ClientsContainerComponent') ? (
    <React.Fragment>
      <CssBaseline />
      <h1>Lista de clientes</h1>
      <Typography
        component='div'
        style={{ backgroundColor: '#FFFFFF', height: '100vh' }}
      >
        <ClientsListContainerComponent />
      </Typography>
    </React.Fragment>
  ) : (
    <AccessDeniedComponent />
  );
