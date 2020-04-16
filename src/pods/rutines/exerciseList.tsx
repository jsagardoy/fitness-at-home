import * as React from 'react';
import { ClientType, TrainerType, ExerciseType } from 'commonApp/interfaces';
import {
  ListItem,
  ListItemIcon,
  List,
  Typography,
  ListItemAvatar,
  Avatar,
  TextField,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { exerciseAPI } from 'api';

interface Props {
  client: ClientType;
  trainer: TrainerType;
}
export const ExerciseListsComponent: React.FC<Props> = (props) => {
  const { client, trainer } = props;

  const getExerciseList = (id: number): ExerciseType =>
    exerciseAPI.find((e) => e.exercise_id === id);

  const composeTrainerExerciseList = (): ExerciseType[] =>
    trainer.exerciseList.map((e) => getExerciseList(e));

  const [trainerExercisesList, setTrainerExercisesList] = React.useState<
    ExerciseType[]
  >(composeTrainerExerciseList());
  const [clientList, setClientList] = React.useState<number[]>([]);

  const handleSearchFilter = (value: string, field: string) => {
    switch (field) {
      case 'trainer':
        setTrainerExercisesList(
          composeTrainerExerciseList().filter((t) => t.name.includes(value))
        );
        break;
      case 'client':
        break;
    }
  };

  return (
    <div id='trainer list'>
      <TextField
        placeholder='Entrenamiento'
        onChange={(e) => handleSearchFilter(e.target.value, 'trainer')}
      />
      <List className='trainer-list' component='div'>
        {trainerExercisesList.map((t) => (
          <ListItem key={t.exercise_id}>
            <ListItemAvatar>
              <Avatar variant='square' src={t.images} />
            </ListItemAvatar>
            <Typography paragraph gutterBottom>
              {t.name}
            </Typography>
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='delete'>
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};