import * as React from 'react';
import {
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import {
  ExerciseType,
  ExerciseSettings,
} from 'commonApp/interfaces';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

interface Props {
  clientExercisesList: ExerciseSettings[];
  trainerExerciseList: ExerciseType[];
  handleSearchFilter: (value: string, field: string) => void;
  handleRemoveExercise: (exerciseId: number) => void;
}

export const ClientExerciseListComponent: React.FC<Props> = (props) => {
  const {
    handleSearchFilter,
    clientExercisesList,
    trainerExerciseList,
    handleRemoveExercise,
  } = props;

  const getExerciseInfo = (id: number): ExerciseType =>
    trainerExerciseList.find((e) => e.exercise_id === id);


  return (
    <div id='client-list'>
      <TextField
        placeholder='Entrenamiento'
        onChange={(e) => handleSearchFilter(e.target.value, 'client')}
      />
      <List className='trainer-list' component='div'>
        {clientExercisesList.map((ex) => {
          const exInfo: ExerciseType = getExerciseInfo(ex.exercise_id);
          return (
            <ListItem key={ex.exercise_id}>
            <ListItemAvatar>
              <Avatar variant='square' src={exInfo.images} />
              </ListItemAvatar>
              <Typography paragraph gutterBottom>
              {exInfo.name}
            </Typography>
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                aria-label='remove'
                onClick={(e) => handleRemoveExercise(ex.exercise_id)}
              >
                <ArrowBackIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>);
        })}
      </List>
    </div>
  );
};
