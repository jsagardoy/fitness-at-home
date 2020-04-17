import * as React from 'react';
import { ClientType, TrainerType, ExerciseType } from 'commonApp/interfaces';
import { exerciseAPI } from 'api';
import { TrainerExerciseListComponent } from './trainer-exercise-list';
import { ClientExerciseListComponent } from './client-exercise-list';

interface Props {
  client: ClientType;
  trainer: TrainerType;
}
export const RoutineComposerComponent: React.FC<Props> = (props) => {
  const { client, trainer } = props;

  const getExerciseList = (id: number): ExerciseType =>
    exerciseAPI.find((e) => e.exercise_id === id && isValidClient());

  const composeTrainerExerciseList = (): ExerciseType[] =>
    trainer.exerciseList.map((e) => getExerciseList(e));

  const isValidClient = (): boolean =>
    trainer.clientList.includes(client.client_id) &&
    client.trainer_id === trainer.trainer_id;

  const [trainerExercisesList, setTrainerExercisesList] = React.useState<
    ExerciseType[]
  >(composeTrainerExerciseList());
  const [clientExerciseList, setClientExerciseList] = React.useState<
    ExerciseType[]
  >([]);

  const handleSearchFilter = (value: string, field: string) => {
    switch (field) {
      case 'trainer':
        setTrainerExercisesList(
          composeTrainerExerciseList().filter((t) => t.name.includes(value))
        );
        break;
      case 'client':
        setClientExerciseList(
          clientExerciseList.filter((e) => e.name.includes(value))
        );
        break;
    }
  };

  return (
    <>
      <TrainerExerciseListComponent
        handleSearchFilter={handleSearchFilter}
        trainerExercisesList={trainerExercisesList}
      />
      <ClientExerciseListComponent
        handleSearchFilter={handleSearchFilter}
        clientExercisesList={clientExerciseList}
      />
    </>
  );
};
