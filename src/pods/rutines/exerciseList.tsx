import * as React from 'react';
import {
  ClientType,
  TrainerType,
  ExerciseType,
  ExerciseSettings,
} from 'commonApp/interfaces';
import { exerciseAPI } from 'api';
import { TrainerExerciseListComponent } from './trainer-exercise-list';
import { ClientExerciseListComponent } from './client-exercise-list';
import { ExerciseModalComponent } from './exercise-modal';

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

  const getClientExerciseInfo = (id: number): ExerciseType =>
    exerciseAPI.find((ex) => ex.exercise_id === id);

  const handleSearchFilter = (value: string, field: string) => {
    switch (field) {
      case 'trainer':
        setTrainerExercisesList(
          composeTrainerExerciseList().filter((t) => t.name.includes(value))
        );
        break;
      case 'client':
        setClientExerciseList(
          client.exercisesList.filter((ex) =>
            getClientExerciseInfo(ex.exercise_id).name.includes(value)
          )
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
    const newArray = clientExerciseList.filter((ex) => ex.exercise_id!==exerciseId)
    setClientExerciseList(
      newArray
    );
  };
  const handleAddExerciseSettings = (exerciseId: number) => {
    setOpenModal(true);
    setSelectedTrainerExercise(exerciseId);
  };

  return (
    <>
      <TrainerExerciseListComponent
        handleSearchFilter={handleSearchFilter}
        trainerExercisesList={trainerExercisesList}
        handleAddExerciseSettings={handleAddExerciseSettings}
      />
      <ClientExerciseListComponent
        handleSearchFilter={handleSearchFilter}
        clientExercisesList={clientExerciseList}
        trainerExerciseList={trainerExercisesList}
        handleRemoveExercise={handleRemoveExercise}
      />
      <ExerciseModalComponent
        openModalState={openModal}
        setExerciseSettings={setExerciseSettings}
      />
    </>
  );
};
