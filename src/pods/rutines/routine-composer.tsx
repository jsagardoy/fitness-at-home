import * as React from 'react';
import {
  ClientType,
  TrainerType,
  ExerciseType,
  ExerciseSettings,
} from 'commonApp/interfaces';
import { exerciseAPI, clientAPI } from 'api';
import { TrainerExerciseListComponent } from './trainer-exercise-list';
import { ClientExerciseListComponent } from './client-exercise-list';
import { ExerciseModalComponent } from './exercise-modal';
import Divider from '@material-ui/core/Divider';
import { Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

interface Props {
  client: ClientType;
  trainer: TrainerType;
}
export const RoutineComposerComponent: React.FC<Props> = (props) => {
  const { client, trainer } = props;

  // use for canceling routing purpose
  const clientExerciseListSaved = client.exercisesList;

  React.useEffect(() => {
    // to create a new routine to the client the array needs to be empty
    client.exercisesList = [];
  }, []);

  const getExerciseList = (id: number): ExerciseType =>
    exerciseAPI.find((e) => e.exercise_id === id && isValidClient());

  const composeTrainerExerciseList = (): ExerciseType[] =>
    trainer.exerciseList.map((e) => getExerciseList(e));

  const isValidClient = (): boolean =>
    trainer.clientList.includes(client.client_id) &&
    client.trainer_id === trainer.trainer_id;

  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedTrainerExercise, setSelectedTrainerExercise] = React.useState<
    number
  >(null);
  const [trainerExercisesList, setTrainerExercisesList] = React.useState<
    ExerciseType[]
  >(composeTrainerExerciseList());
  const [clientExerciseList, setClientExerciseList] = React.useState<
    ExerciseSettings[]
  >([]);

  const handleSearchFilter = (value: string, field: string) => {
    switch (field) {
      case 'trainer':
        setTrainerExercisesList(
          composeTrainerExerciseList().filter((t) => t.name.includes(value))
        );
        break;
    }
  };

  const setExerciseSettings = (reps: number, sets: number) => {
    setOpenModal(false);
    const newExercise: ExerciseSettings = {
      exercise_id: selectedTrainerExercise,
      reps,
      sets,
      done: false,
    };
    const newArray: ExerciseSettings[] = [...clientExerciseList];
    newArray.push(newExercise);
    client.exercisesList.push(newExercise);
    setClientExerciseList(newArray);
  };
  const handleRemoveExercise = (exerciseId: number) => {
    const newArray = clientExerciseList.filter(
      (ex) => ex.exercise_id !== exerciseId
    );
    setClientExerciseList(newArray);
  };

  const handleAddExerciseSettings = (exerciseId: number) => {
    setOpenModal(true);
    setSelectedTrainerExercise(exerciseId);
  };

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const saveRoutine = () => {
    client.exercisesList = clientExerciseList;
    // TBD changed witih the DB changing and message called
    const newClient = clientAPI.find((c) => c.client_id === client.client_id);
    clientAPI.splice(
      clientAPI.findIndex((c) => c.client_id === client.client_id),
      1,
      newClient
    );
    setOpen(true);
  };
  return (
    <>
      <TrainerExerciseListComponent
        handleSearchFilter={handleSearchFilter}
        clientExercisesList={clientExerciseList}
        trainerExercisesList={trainerExercisesList}
        handleAddExerciseSettings={handleAddExerciseSettings}
      />
      <Divider />
      <ClientExerciseListComponent
        clientExercisesList={clientExerciseList}
        trainerExerciseList={trainerExercisesList}
        handleRemoveExercise={handleRemoveExercise}
      />
      <ExerciseModalComponent
        openModalState={openModal}
        setExerciseSettings={setExerciseSettings}
      />
      <Button
        disabled={clientExerciseList.length === 0}
        onClick={(e) => saveRoutine()}
      >
        Generar rutina
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity='success'>
          Se ha generado la rutina!
        </Alert>
      </Snackbar>
    </>
  );
};
