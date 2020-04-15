import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { TrainerType, ClientType } from 'common-app/interfaces';
import { trainerAPI, clientAPI } from 'api';
interface Props {}

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

  const isValidClient = (): boolean =>
    getTrainer().clientList.includes(+clientId) &&
    getClient().trainer_id === getTrainer().trainer_id;

  const isValidExercise = (idExercise: number): boolean =>
      getTrainer().exerciseList.includes(idExercise);
    
  return (
    <>
      <Button id='backButton' onClick={(e) => handleBackToClientList()}>
        <ArrowBackIosIcon /> Lista de Clientes
      </Button>
    </>
  );
};
