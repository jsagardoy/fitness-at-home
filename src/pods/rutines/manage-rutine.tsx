import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { TrainerType, ClientType } from 'commonApp/interfaces';
import { trainerAPI, clientAPI } from 'api';
import { AccessDeniedComponent, hasPermision } from 'commonApp/components';
import { RoutineComposerComponent } from './routine-composer';

interface Props { }

export const ManageRoutinesComponent: React.FC<Props> = (props) => {
  const history = useHistory();
  const { trainerId, clientId } = useParams();

  const handleBackToClientList = () => {
    history.push(`/trainer/${trainerId}/clients`);
  };

  const getTrainer = (): TrainerType =>
    trainerAPI.find((t) => t.trainer_id === +trainerId);

  const getClient = (): ClientType =>
    clientAPI.find((c) => c.client_id === +clientId);

  return hasPermision('ManageRoutinesComponent') ? (
    <>
      <Button id='backButton' onClick={(e) => handleBackToClientList()}>
        <ArrowBackIosIcon /> Lista de Clientes
      </Button>
      <RoutineComposerComponent client={getClient()} trainer={getTrainer()} />
    </>
  ) : (
    <AccessDeniedComponent />
  );
};
