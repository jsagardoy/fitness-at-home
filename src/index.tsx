import * as React from 'react';
import ReactDOM from 'react-dom';
import { ClientsContainerComponent } from 'layout';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { App } from 'scenes/app';
import { ClientDetailComponent } from 'pods/clients';
import { LoginComponent, logoutHandlerComponent } from 'common/login';
import { getSessionCookie } from 'common/cookies';
import { ManageRoutinesComponent } from 'pods/rutines';
import { ExerciseListComponent, ExerciseCardComponent } from './pods/exercises';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        getSessionCookie() !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const routing = (
  <Router>
    <Switch>
      <PrivateRoute exact path='/' component={App} />
      <Route exact path='/login' component={LoginComponent} />
      <PrivateRoute exact path='/logout' component={logoutHandlerComponent} />
      <PrivateRoute
        exact
        path='/trainer/:trainerId/clients'
        component={ClientsContainerComponent}
      />
      <PrivateRoute
        exact
        path='/trainer/:trainerId/client/:clientId'
        component={ClientDetailComponent}
      />
      <PrivateRoute
        exact
        path='/trainer/:trainerId/client/:clientId/generate-rutine'
        component={ManageRoutinesComponent}
      />
      <PrivateRoute
        exact
        path='/trainer/:trainerId/exercise-list'
        component={ExerciseListComponent}
      />
      <PrivateRoute
        exact
        path='/trainer/:trainerId/exercise-info/:exerciseId'
        component={ExerciseCardComponent}
      />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
