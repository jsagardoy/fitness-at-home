import * as React from 'react';
import { Link } from 'react-router-dom';

export const App: React.FC<{}> = () => {
  const clientId: number = 1;
  const trainerId: number = 1;
  return (
    <>
      <h1>Home APP</h1>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to={`/trainer/${trainerId}/clients`}>Clients</Link>
            </li>
            <li>
              <Link to={`/trainer/${trainerId}/client/${clientId}`}>Agente Wigum</Link>
            </li>
            <li>
              <Link to={`/trainer/${trainerId}/exercise-list`}>Lista de ejercicios de entrenador</Link>
            </li>
            <li>
              <Link to={`/login`}>Login</Link>
            </li>
            <li>
              <Link to={`/logout`}>Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
